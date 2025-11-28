---
title: lynx - General purpose distributed information browser
sidebar_label: lynx
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lynx - General purpose distributed information browser

The `lynx` command is a fully-featured World Wide Web (WWW) client for users running cursor-addressable, character-cell terminal devices. It provides a text-based web browsing experience that is lightweight, fast, and highly accessible. Lynx is particularly valuable for system administrators, users with visual impairments, or anyone working in remote terminal environments where graphical browsers aren't available. It supports HTML rendering, form submission, bookmark management, cookies, SSL/TLS connections, and can be used both interactively and non-interactively for web scraping and automation tasks.

## Basic Syntax

```bash
lynx [OPTIONS] [URL_or_FILE]
```

## Display Options

### Terminal Settings
- `-display=DISPLAY` - Set the X display
- `-term=TERM` - Specify terminal type
- `-raw` - Use raw terminal control codes
- `-nocolor` - Turn off color support
- `-color` - Force color support
- `-reverse` - Use reverse video
- `-underline` - Use underline highlighting
- `-nounderline` - Don't use underline

### Display Mode
- `-show_cursor` - Show the cursor
- `-hide_cursor` - Hide the cursor
- `-scrollbar` - Enable scrollbar
- `-noscrollbar` - Disable scrollbar

## Navigation and Interface

### Navigation Controls
- `-anonymous` - Restrict to anonymous access
- `-auth=id:pw` - Set authentication credentials
- `-base` - Use HREF base for relative URLs
- `-book` - Use alternate bookmark file
- `-cfg=FILE` - Use alternate configuration file

### User Interface
- `-noautosource` - Don't show source automatically
- `-nobold` - Turn off bold highlighting
- `-bold` - Force bold highlighting
- `-dump` - Dump formatted output to stdout
- `-head` - Send HEAD request
- `-source` - Show HTML source

## Network and Connection

### HTTP Options
- `-get_data` - Send data with GET request
- `-post_data` - Send data with POST request
- `-refer=URL` - Set referring URL
- `-useragent=STRING` - Set custom User-Agent string
- `-cookies` - Enable cookie handling
- `-nocookies` - Disable cookie handling

### Security and Authentication
- `-assume_charset=MIMEname` - Assume charset
- `-assume_local_charset=MIMEname` - Assume charset for local files
- `-assume_unrec_charset=MIMEname` - Assume charset for unrecognized
- `-pseudo_inlines` - Treat pseudo-inlines as normal inlines
- `-nopseudo_inlines` - Don't treat pseudo-inlines as normal

## Output and File Handling

### Output Options
- `-dump` - Dump formatted output to stdout
- `-head` - Send HEAD request only
- `-source` - Dump HTML source to stdout
- `-stdout` - Write to stdout instead of file
- `-crawl` - Crawl through web pages

### File Operations
- `-width=NUMBER` - Set screen width for formatting
- `-nowrap` - Don't wrap long lines
- `-case` - Case-sensitive searching
- `-nocase` - Case-insensitive searching
- `-cmd_script=FILE` - Read keystrokes from file

## Usage Examples

### Basic Web Browsing

#### Simple Navigation
```bash
# Browse to a website
lynx https://www.example.com

# Browse with specific URL protocol
lynx ftp://ftp.gnu.org/

# Open local HTML file
lynx /path/to/local/file.html

# Start with default start page
lynx

# Browse to specific page and scroll
lynx -dump https://www.example.com | less
```

#### Interactive Browsing
```bash
# Browse with specific terminal settings
lynx -term=xterm-256color https://www.wikipedia.org

# Browse with custom configuration
lynx -cfg=/home/user/.lynx.cfg https://www.github.com

# Browse anonymously (no personal data sent)
lynx -anonymous https://privacy-focused-site.com

# Browse with specific display settings
lynx -nocolor -noscrollbar https://text-based-site.com
```

### Content Viewing and Saving

#### Content Extraction
```bash
# Dump formatted text content
lynx -dump https://www.example.com > page_content.txt

# Get raw HTML source
lynx -source https://www.example.com > raw_page.html

# Get just the headers
lynx -head https://www.example.com

# Get page content with specific width
lynx -width=80 -dump https://www.example.com > formatted_content.txt
```

#### File Operations
```bash
# Save web page to file
lynx -dump https://www.example.com > saved_page.txt

# Save HTML source
lynx -source https://www.example.com > source_code.html

# Create local copy of web page
lynx -crawl -depth=1 https://www.example.com
```

### Authentication and Security

#### HTTP Authentication
```bash
# Basic HTTP authentication
lynx -auth=username:password https://secure-site.com

# Navigate with custom user agent
lynx -useragent="CustomBot/1.0" https://www.example.com

# Browse with custom referer
lynx -refer="https://google.com" https://target-site.com

# Enable cookies for session management
lynx -cookies https://session-based-site.com
```

#### SSL/TLS Connections
```bash
# Browse HTTPS sites (default behavior)
lynx https://secure.example.com

# Handle self-signed certificates
lynx -accept_all_ssl https://self-signed-site.com

# Browse with specific SSL settings
lynx -ssl_verify_peer https://banking-site.com
```

### Advanced Browsing

#### Search and Navigation
```bash
# Case-sensitive search within page
lynx -case https://www.example.com

# Case-insensitive search
lynx -nocase https://www.example.com

# Search for specific terms
echo "search_term" | lynx -dump https://search-site.com

# Navigate using keyboard script
lynx -cmd_script=nav_script.txt https://www.example.com
```

#### Form Handling
```bash
# Send GET request with parameters
lynx -get_data "name=value&param2=value2" https://api.example.com/search

# Send POST request with data
lynx -post_data "username=admin&password=secret" https://login.example.com

# Submit form data from file
lynx -post_data "$(cat form_data.txt)" https://submit.example.com
```

## Practical Examples

### System Administration

#### Server Monitoring
```bash
# Check if website is accessible
lynx -dump -head https://www.myservice.com

# Monitor HTTP response headers
lynx -dump https://api.service.com/health

# Test service endpoints
lynx -source http://localhost:8080/status

# Check server status pages
lynx -dump https://admin.myservice.com/status
```

#### Log Analysis
```bash
# View web server logs through web interface
lynx -dump https://logs.myservice.com/today

# Access monitoring dashboards
lynx -dump https://monitoring.example.com/metrics

# Check error pages
lynx -dump https://www.example.com/error-logs
```

### Web Development and Testing

#### Website Testing
```bash
# Test website accessibility from text-only perspective
lynx -dump https://www.mywebsite.com

# Check page structure and content
lynx -source https://www.mywebsite.com > structure.html

# Test mobile optimization (text-based view)
lynx -width=40 -dump https://www.mywebsite.com

# Verify HTTP headers
lynx -head https://www.mywebsite.com
```

#### Content Validation
```bash
# Extract all links from a page
lynx -dump https://www.example.com | grep "http"

# Check page title
lynx -dump https://www.example.com | head -5

# Validate HTML structure (basic check)
lynx -source https://www.example.com | grep -E "<title>|</title>"

# Check meta tags
lynx -source https://www.example.com | grep -i meta
```

### Data Collection and Scraping

#### Web Scraping
```bash
# Extract article content
lynx -dump https://news.example.com/article.html > article.txt

# Scrape multiple pages
for page in {1..10}; do
    lynx -dump "https://blog.example.com/page/$page" >> "all_posts.txt"
done

# Extract specific content patterns
lynx -dump https://data.example.com | grep -E "Name:|Email:|Phone:"

# Download text content from multiple sites
cat urls.txt | xargs -I{} lynx -dump "{}" -o "content_{}.txt"
```

#### API Testing
```bash
# Test API endpoints
lynx -source https://api.example.com/users

# Send API requests with parameters
lynx -source "https://api.example.com/search?q=linux&limit=10"

# Test JSON API responses
lynx -source https://json.example.com/data | jq .

# Check API status
lynx -dump https://api.example.com/status
```

### Automation and Scripting

#### Batch Processing
```bash
# Process multiple URLs
cat url_list.txt | while read url; do
    echo "Processing: $url"
    lynx -dump "$url" > "output_$(date +%s).txt"
done

# Regular content extraction
lynx -dump https://news.example.com | grep -A 5 "Breaking News" > latest_news.txt

# Automated website monitoring
lynx -dump https://service.example.com/health | grep -q "OK" && echo "Service is up"
```

#### Content Conversion
```bash
# Convert HTML to plain text
lynx -dump input.html > output.txt

# Create readable text from web pages
lynx -width=72 -dump https://www.example.com/article.txt

# Format content for email
lynx -dump https://www.example.com | mail -s "Web Content" user@example.com

# Create book-formatted content
lynx -width=60 -dump https://www.example.com/book.txt | fold -w 60
```

## Advanced Usage

### Configuration and Customization

#### Custom Configuration Files
```bash
# Use personal configuration
lynx -cfg=~/.lynx/personal.cfg https://www.example.com

# Create project-specific configuration
echo "STARTFILE:https://myproject.com" > project.cfg
lynx -cfg=project.cfg

# Set preferences for accessibility
echo "COLOR:0" > accessibility.cfg
echo "SHOW_CURSOR:ON" >> accessibility.cfg
lynx -cfg=accessibility.cfg https://www.example.com
```

#### Bookmark Management
```bash
# Use custom bookmark file
lynx -book=~/.lynx/workmarks https://www.example.com

# Create bookmark for frequent access
echo "https://github.com" >> ~/.lynx/bookmarks.html
lynx -book=~/.lynx/bookmarks.html

# Organize bookmarks by category
echo "<h2>Development</h2>" > dev_bookmarks.html
echo "<a href="https://github.com">GitHub</a><br>" >> dev_bookmarks.html
lynx -book=dev_bookmarks.html
```

### Scripting and Automation

#### Keyboard Scripting
```bash
# Create navigation script
cat > navigate.txt << EOF
^E  # Edit current URL
github.com
^R  # Reload
q   # Quit
EOF

# Execute navigation script
lynx -cmd_script=navigate.txt

# Automated form submission
cat > form_submit.txt << EOF
https://form.example.com
Tab
Tab
username
Tab
password
Tab
Enter
EOF

lynx -cmd_script=form_submit.txt
```

#### Advanced Data Extraction
```bash
# Extract table data
lynx -dump https://data.example.com | awk '/Table/ {flag=1} flag {print} /^\s*$/ {flag=0}'

# Extract specific sections
lynx -dump https://news.example.com | sed -n '/Breaking News/,/^[A-Z]/p'

# Create structured data output
lynx -dump https://directory.example.com | grep -E "Name:|Phone:|Email:" | paste - - -

# Generate CSV from web data
lynx -dump https://prices.example.com | tr -s ' ' | cut -d' ' -f2,4
```

### Performance Optimization

#### Bandwidth Management
```bash
# Minimal bandwidth usage
lynx -nopseudo_inlines https://text-heavy-site.com

# Text-only browsing (no images)
lynx -assume_charset=text/plain https://any-site.com

# Faster page loads with minimal rendering
lynx -nolist https://simple-content.com

# Use HEAD requests to check availability
lynx -head https://resource-heavy-site.com
```

#### Terminal Optimization
```bash
# Optimize for slow connections
lynx -width=40 -nocolor https://mobile-friendly-site.com

# Use specific terminal capabilities
lynx -term=vt100 https://legacy-system.com

# Minimal memory usage
lynx -raw https://large-content-site.com

# Batch processing with limited output
lynx -dump -head https://api.example.com/check
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Test basic connectivity
lynx -dump http://example.com

# Check DNS resolution
lynx -dump http://httpbin.org/ip

# Test with verbose output
lynx -trace http://example.com

# Handle connection timeouts
timeout 30 lynx -dump https://slow-site.com
```

#### Character Encoding Issues
```bash
# Force UTF-8 encoding
lynx -assume_charset=utf-8 https://international-site.com

# Try different encodings
lynx -assume_charset=iso-8859-1 https://legacy-site.com

# Handle mixed encoding pages
lynx -assume_local_charset=utf-8 /path/to/local/file.html
```

#### Display Problems
```bash
# Disable colors for compatibility
lynx -nocolor https://site-with-colors.com

# Use specific terminal width
lynx -width=120 https://wide-content-site.com

# Disable line wrapping
lynx -nowrap https://preformatted-text.com

# Test with basic terminal
lynx -term=vt220 https://problematic-site.com
```

### Performance Issues

#### Slow Loading Pages
```bash
# Get only headers to check response
lynx -head https://slow-site.com

# Limit output to first part
lynx -dump https://large-site.com | head -50

# Use HTTP/1.0 for compatibility
lynx -http10 https://legacy-server.com

# Disable SSL verification (only for testing)
lynx -anonymous https://ssl-problem-site.com
```

#### Memory Usage
```bash
# Process large files in chunks
split -l 1000 large_file.txt chunk_
for chunk in chunk_*; do
    lynx -dump "file://$PWD/$chunk"
done

# Use raw mode for memory efficiency
lynx -raw -dump file:///path/to/large/file.html

# Minimize caching
lynx -nocache -dump https://dynamic-content.com
```

## Related Commands

- [`curl`](/docs/commands/network/curl) - Command-line tool for transferring data with URLs
- [`wget`](/docs/commands/network/wget) - Network downloader to retrieve files from the web
- [`elinks`](/docs/commands/other/elinks) - Advanced text-based web browser
- [`w3m`](/docs/commands/other/w3m) - Text-based web browser with table/frame support
- [`links`](/docs/commands/other/links) - Text-based web browser
- [`httpie`](/docs/commands/network/httpie) - Modern command-line HTTP client
- [`nc`](/docs/commands/network/nc) - Netcat for network connections and debugging
- [`telnet`](/docs/commands/network/telnet) - User interface to the TELNET protocol

## Best Practices

1. **Use -dump** for automation scripts when you just need content extraction
2. **Enable cookies** (-cookies) when accessing sites that require sessions
3. **Set appropriate width** (-width) for readable output in scripts
4. **Use -head** for quick availability checks without downloading content
5. **Configure proper User-Agent** when accessing sites with bot detection
6. **Use authentication options** (-auth) for accessing protected resources
7. **Handle SSL properly** when accessing secure sites
8. **Use -source** for debugging HTML structure and extracting specific elements
9. **Optimize terminal settings** (-term, -nocolor) for better display
10. **Create bookmark files** for frequently accessed sites and resources

## Performance Tips

1. **Use -head** instead of full requests when checking site availability
2. **Disable colors** (-nocolor) for faster rendering on slow connections
3. **Set appropriate width** (-width) to minimize line processing
4. **Use -raw** mode for minimal resource usage
5. **Avoid loading images** with -nopseudo_inlines for text-only content
6. **Cache DNS lookups** when accessing multiple pages from the same domain
7. **Use HTTP/1.0** (-http10) for legacy server compatibility
8. **Process large content** in chunks to avoid memory issues
9. **Use timeout commands** to prevent hanging on slow sites
10. **Batch operations** for multiple URL processing to reduce overhead

The `lynx` command remains an essential tool for text-based web browsing, offering powerful features for content extraction, web scraping, remote access, and automation. Its lightweight nature and extensive options make it invaluable for system administrators, developers, and anyone working in terminal environments who needs reliable web access without graphical overhead.