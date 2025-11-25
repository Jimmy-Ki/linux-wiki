// This script generates a real SVG image with user's IP
// It will be executed client-side to generate the image

document.addEventListener('DOMContentLoaded', async function() {
    // Get current IP
    let ipAddress = '127.0.0.1';
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
    } catch (error) {
        console.error('Failed to get IP:', error);
    }

    // Generate timestamp
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');

    // Create SVG
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
    <defs>
        <style>
            .title-text { fill: #4CAF50; font-family: Arial, sans-serif; font-weight: bold; }
            .ip-text { fill: #4CAF50; font-family: Monaco, Consolas, monospace; font-weight: bold; }
            .time-text { fill: #888888; font-family: Monaco, Consolas, monospace; font-size: 12px; }
        </style>
    </defs>

    <!-- Background -->
    <rect width="400" height="200" fill="#1a1a1a"/>

    <!-- Left side: Logo placeholder -->
    <rect x="20" y="70" width="60" height="60" fill="#4CAF50" rx="8"/>
    <text x="50" y="108" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial">L</text>

    <!-- Linux.wiki text -->
    <text x="50" y="150" text-anchor="middle" class="title-text" font-size="16">linux.wiki</text>

    <!-- Right side: IP Address -->
    <text x="250" y="105" text-anchor="middle" class="ip-text" font-size="24">${ipAddress}</text>

    <!-- Bottom: Time -->
    <text x="200" y="180" text-anchor="middle" class="time-text">${timeString}</text>
</svg>`;

    // Set content type to image/svg+xml
    document.contentType = 'image/svg+xml';

    // Replace entire page content with SVG
    document.documentElement.innerHTML = svg;
    document.title = 'IP Card';
});