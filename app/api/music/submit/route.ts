import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { artist, songName, musicLink, suggestedBy } = await req.json();

    // Validate input
    if (!artist || !songName || !musicLink || !suggestedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate URL format
    const isValidUrl = musicLink.startsWith('http://') || musicLink.startsWith('https://');
    if (!isValidUrl) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Check if it's YouTube or Spotify
    const isYouTube = musicLink.includes('youtube.com') || musicLink.includes('youtu.be');
    const isSpotify = musicLink.includes('spotify.com');

    if (!isYouTube && !isSpotify) {
      return NextResponse.json(
        { error: 'Only YouTube and Spotify links are allowed' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Discord webhook not configured' },
        { status: 500 }
      );
    }

    // Determine platform emoji
    const platformEmoji = isYouTube ? '🎥' : '🎵';

    // Send to Discord
    const discordMessage = {
      content: '',
      embeds: [
        {
          title: `${platformEmoji} New Music Suggestion!`,
          color: isYouTube ? 0xFF0000 : 0x1DB954,
          fields: [
            {
              name: 'Artist',
              value: artist,
              inline: true,
            },
            {
              name: 'Song',
              value: songName,
              inline: true,
            },
            {
              name: 'Suggested by',
              value: suggestedBy,
              inline: true,
            },
            {
              name: 'Platform',
              value: isYouTube ? 'YouTube' : 'Spotify',
              inline: true,
            },
            {
              name: 'Link',
              value: `[Click here](${musicLink})`,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      console.error('Discord webhook error:', response.statusText);
      return NextResponse.json(
        { error: 'Failed to send to Discord' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Music suggestion sent successfully!',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
