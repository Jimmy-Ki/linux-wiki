---
title: perl - Perl Interpreter
sidebar_label: perl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# perl - Perl Interpreter

The `perl` command is a powerful, high-level programming language interpreter that excels at text processing, system administration, and web development. Perl combines features from various languages including C, sed, awk, and shell scripting, making it particularly well-suited for tasks involving regular expressions, file manipulation, and system integration. With its extensive module ecosystem (CPAN) and "TMTOWTDI" (There's More Than One Way To Do It) philosophy, Perl provides flexible solutions for complex programming challenges.

## Basic Syntax

```bash
perl [OPTIONS] [-e 'CODE'] [-l[OCTAL]] [-0[OCTAL]] [-i[EXTENSION]] [PROGRAMFILE] [ARGUMENTS]
```

## Common Options

### Execution Options
- `-e 'CODE'` - Execute Perl code directly from command line
- `-E 'CODE'` - Enable modern features (like `use feature ':5.10'`)
- `-p` - Loop over input files, print each line after processing
- `-n` - Loop over input files without printing
- `-a` - Autosplit mode (splits input into @F array)
- `-F/PATTERN/` - Split pattern for autosplit mode
- `-i[EXTENSION]` - Edit files in-place (with optional backup extension)

### Input/Output Options
- `-l[OCTAL]` - Enable line ending processing
- `-0[OCTAL]` - Specify record separator (default \n)
- `-n` - Process files line by line (implicit while loop)
- `-p` - Same as -n but also prints each line
- `-mMODULE` - Use module (like `use MODULE`)
- `-MMODULE` - Use module with import (like `use MODULE LIST`)
- `-I DIRECTORY` - Add directory to @INC search path

### Warning and Debug Options
- `-w` - Enable warnings (deprecated, prefer `use warnings`)
- `-W` - Enable all warnings
- `-X` - Disable all warnings
- `-c` - Syntax check only (no execution)
- `-d` - Run under debugger
- `-D[OPTIONS]` - Set debugging flags
- `-v` - Print version information
- `-h` - Print help message

### Performance Options
- `-C [NUMBER]` - Set Unicode flags
- `-T` - Enable taint mode for security
- `-t` - Enable taint warnings

## Usage Examples

### Basic Perl Execution

#### Command Line Execution
```bash
# Simple one-liner
perl -e 'print "Hello, World!\n"'

# Print current date
perl -e 'use POSIX qw(strftime); print strftime("%Y-%m-%d\n", localtime)'

# Calculate mathematical expression
perl -e 'print sqrt(16), "\n"'

# Print environment variable
perl -e 'print $ENV{"HOME"}, "\n"'

# List files in current directory
perl -e 'map { print "$_\n" } glob("*")'
```

#### File Processing
```bash
# Process file line by line
perl -ne 'print "$_" if /error/' log.txt

# Count lines in file
perl -ne 'END { print $. }' file.txt

# Replace text in file
perl -pi.bak -e 's/old_text/new_text/g' file.txt

# Remove blank lines
perl -ne 'print unless /^\s*$/' file.txt

# Number lines
perl -pe '$_ = sprintf("%d: %s", $., $_)' file.txt
```

### Text Processing with Regular Expressions

#### Pattern Matching
```bash
# Extract email addresses from text
perl -ne 'print "$1\n" while /([\w\.-]+@[\w\.-]+)/g' emails.txt

# Find lines containing specific pattern
perl -ne 'print if /^ERROR:/' application.log

# Extract IP addresses
perl -ne 'print "$1\n" if /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/' access.log

# Count word occurrences
perl -ne '$count{$1}++ while /\b(\w+)\b/gi; END { print "$_: $count{$_}\n" for keys %count }' text.txt
```

#### Text Manipulation
```bash
# Convert to lowercase
perl -ne 'print lc' file.txt

# Remove HTML tags
perl -pe 's/<[^>]*>//g' html_file.txt

# Format CSV data
perl -F',' -lane 'printf "%-20s %s\n", $F[0], $F[1]' data.csv

# Replace multiple spaces with single space
perl -pe 's/\s+/ /g' file.txt

# Add line numbers to each line
perl -pe '$_ = sprintf("%5d: %s", $., $_)' source_code.txt
```

### Data Processing

#### CSV Processing
```bash
# Extract specific columns from CSV
perl -F',' -lane 'print "$F[0],$F[2]" if $F[1] eq "Active"' users.csv

# Calculate sum of numeric column
perl -F',' -lane '$sum += $F[2]; END { print $sum }' sales.csv

# Filter rows based on condition
perl -F',' -lane 'print if $F[3] > 1000' data.csv

# Sort CSV by column
perl -F',' -lane 'push @a, [@F]; END { @a = sort { $a->[2] <=> $b->[2] } @a; print join(",", @$_) for @a }' data.csv
```

#### Log Analysis
```bash
# Count HTTP status codes
perl -ne '$count{$1}++ if /" (\d{3}) /; END { print "$_: $count{$_}\n" for sort keys %count }' access.log

# Extract unique IP addresses
perl -ne '$ips{$1}++ if /^(\d+\.\d+\.\d+\.\d+)/; END { print "$_\n" for keys %ips }' access.log

# Calculate average response time
perl -ne 'push @times, $1 if /response_time=(\d+)/; END { $avg = eval(join("+", @times)/@times); print "Average: $avg\n" }' app.log

# Find errors in last hour
perl -ne 'if (/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*ERROR/) { push @errors, $1 if time - str2time($1) < 3600 }; END { print "$_\n" for @errors' server.log
```

### System Administration

#### File Management
```bash
# Find files larger than 10MB
perl -MFile::Find -e 'find(sub { printf "%s %d MB\n", $File::Find::name, (-s)/1024/1024 if -f && -s > 10*1024*1024 }, ".")'

# Rename files (change extension)
perl -e 'for (@ARGV) { rename $_, s/\.txt$/.doc/r }' *.txt

# Create directory structure
perl -e 'mkdir "project"; for (1..5) { mkdir "project/module$_" }'

# Calculate directory sizes
perl -MFile::Find -e 'find(sub { $total += -s if -f }, $ARGV[0]); print "$ARGV[0]: $total bytes\n"' /var/log
```

#### Process Management
```bash
# Find processes using high memory
perl -ne 'print "$1 $2\n" if /^\s*(\d+)\s+\w+\s+(\d+)/ && $2 > 100000' <(ps aux)

# Monitor disk usage
perl -MPOSIX -e 'while (1) { @s = stat("/"); print strftime("%Y-%m-%d %H:%M:%S", localtime), " ", $s[7]/1024/1024, " MB\n"; sleep 60 }'

# Check system load
perl -MPOSIX -e 'while (1) { @load = split " ", `cat /proc/loadavg`; print strftime("%Y-%m-%d %H:%M:%S", localtime), " Load: $load[0]\n"; sleep 30 }'
```

### Web Development

#### HTML Processing
```bash
# Extract all links from HTML
perl -MHTML::LinkExtor -e '$p = HTML::LinkExtor->new(); $p->parse_file($ARGV[0]); print $_->[1], "\n" for $p->links' webpage.html

# Clean up HTML
perl -MHTML::Scrubber -e '$scrubber = HTML::Scrubber->new(); while (<>) { print $scrubber->scrub($_) }' dirty.html

# Generate sitemap
perl -MFile::Find -e 'find(sub { push @files, $File::Find::name if /\.html?$/ }, "."); print "<?xml version=\"1.0\"?>\n<urlset>\n"; for (@files) { s/^\.\///; print "  <url><loc>$_</loc></url>\n" } print "</urlset>\n"'
```

#### URL Processing
```bash
# Extract URLs from text
perl -ne 'print "$1\n" while /(https?:\/\/[^\s]+)/g' text_file.txt

# URL encode string
perl -MURI::Escape -e 'print uri_escape($ARGV[0])' "hello world!"

# URL decode string
perl -MURI::Escape -e 'print uri_unescape($ARGV[0])' "hello%20world"

# Parse query parameters
perl -MURI -e '$uri = URI->new($ARGV[0]); print "$_=" . $uri->query_param($_) . "\n" for $uri->query_param'
```

## Advanced Usage

### Database Operations

#### SQLite Database
```bash
# Create SQLite database
perl -MDBI -e '$dbh = DBI->connect("dbi:SQLite:mydb.db"); $dbh->do("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)")'

# Insert data into database
perl -MDBI -e '$dbh = DBI->connect("dbi:SQLite:mydb.db"); $sth = $dbh->prepare("INSERT INTO users (name, email) VALUES (?, ?)"); $sth->execute("John Doe", "john@example.com")'

# Query database
perl -MDBI -e '$dbh = DBI->connect("dbi:SQLite:mydb.db"); $sth = $dbh->prepare("SELECT * FROM users"); $sth->execute(); while (@row = $sth->fetchrow_array) { print "@row\n" }'
```

#### MySQL Operations
```bash
# Connect to MySQL and query data
perl -MDBI -e '$dbh = DBI->connect("DBI:mysql:database=test;host=localhost", "user", "pass"); $sth = $dbh->prepare("SELECT * FROM users WHERE active = 1"); $sth->execute(); printf "%-20s %s\n", "Name", "Email"; print "-" x 40, "\n"; while (($name, $email) = $sth->fetchrow_array) { printf "%-20s %s\n", $name, $email }'

# Export MySQL data to CSV
perl -MDBI -e '$dbh = DBI->connect("DBI:mysql:database=test;host=localhost", "user", "pass"); $sth = $dbh->prepare("SELECT * FROM products"); $sth->execute(); open $fh, ">", "products.csv"; while (@row = $sth->fetchrow_array) { print $fh join(",", @row), "\n" }'
```

### Network Operations

#### HTTP Requests
```bash
# Simple HTTP GET request
perl -MLWP::UserAgent -e '$ua = LWP::UserAgent->new(); $response = $ua->get($ARGV[0]); print $response->content if $response->is_success' https://example.com

# Download file from URL
perl -MLWP::Simple -e 'getstore($ARGV[0], $ARGV[1])' https://example.com/file.txt downloaded.txt

# Check website status
perl -MLWP::UserAgent -e '$ua = LWP::UserAgent->new(); $response = $ua->get($ARGV[0]); print $response->code, " ", $response->message, "\n"' https://example.com

# POST data to web service
perl -MLWP::UserAgent -MHTTP::Request::Common -e '$ua = LWP::UserAgent->new(); $response = $ua->request(POST $ARGV[0], [name => "John", email => "john@example.com"]); print $response->as_string' https://api.example.com/submit
```

#### TCP/IP Operations
```bash
# Simple TCP server
perl -MSocket -e 'socket(S, PF_INET, SOCK_STREAM, getprotobyname("tcp")); setsockopt(S, SOL_SOCKET, SO_REUSEADDR, 1); bind(S, pack_sockaddr_in(8080, INADDR_ANY)); listen(S, 1); accept(C, S); print while <C>'

# TCP client
perl -MSocket -e 'socket(S, PF_INET, SOCK_STREAM, getprotobyname("tcp")); connect(S, pack_sockaddr_in(80, inet_aton("example.com"))); print S "GET / HTTP/1.0\r\n\r\n"; print while <S>'

# Port scanner
perl -MSocket -MIO::Socket -e 'for $port (1..1024) { $socket = IO::Socket::INET->new(PeerAddr => $ARGV[0], PeerPort => $port, Proto => "tcp", Timeout => 1); print "Port $port open\n" if $socket }' localhost
```

## Practical Examples

### File System Operations

#### Backup Script
```bash
#!/bin/bash
# Automated backup with Perl

perl -MFile::Find -MFile::Copy -MFile::Path -e '
$src = "/home/user/documents";
$dst = "/backup/documents_$(date +%Y%m%d)";
$exclude = qr/(\.tmp$|\.log$|node_modules)/;

find(sub {
    return if -d and $_ =~ $exclude;
    return if -f and $_ =~ $exclude;

    $rel = $File::Find::name;
    $rel =~ s{^\Q$src\E/?}{};

    if (-d) {
        mkpath("$dst/$rel");
    } elsif (-f) {
        mkpath("$dst/" . dirname($rel));
        copy($File::Find::name, "$dst/$rel") or warn "Cannot copy $File::Find::name: $!";
    }
}, $src);

print "Backup completed to $dst\n"
'
```

#### Log Rotation
```bash
#!/bin/bash
# Log rotation script with compression

perl -MFile::Copy -MCompress::Zlib -e '
$log_dir = "/var/log";
$max_files = 7;
@logs = qw(app.log error.log access.log);

for $log (@logs) {
    $current = "$log_dir/$log";
    next unless -f $current;

    # Rotate existing files
    for ($i = $max_files - 1; $i > 0; $i--) {
        $old = "$current.$i.gz";
        $new = "$current." . ($i + 1) . ".gz";
        rename $old, $new if -f $old;
    }

    # Compress current log
    if (-f "$current.1") {
        $gz = gzopen("$current.1.gz", "wb") or die "Cannot open $current.1.gz: $!";
        open $fh, "<", "$current.1" or die "Cannot open $current.1: $!";
        while (sysread $fh, $buffer, 4096) {
            $gz->gzwrite($buffer);
        }
        $gz->gzclose();
        close $fh;
        unlink "$current.1";
    }

    # Move current log to .1
    move $current, "$current.1" if -f $current;
}
'
```

### Data Analysis

#### Statistical Analysis
```bash
# Calculate basic statistics for numeric data
perl -e '
while (<>) {
    chomp;
    push @data, $_ if /^\d+\.?\d*$/;
}

if (@data) {
    @sorted = sort { $a <=> $b } @data;
    $count = @data;
    $sum = eval join "+", @data;
    $mean = $sum / $count;
    $median = $sorted[int($count/2)];
    $min = $sorted[0];
    $max = $sorted[-1];

    # Standard deviation
    $sq_sum = 0;
    $sq_sum += ($x - $mean) ** 2 for @data;
    $stddev = sqrt($sq_sum / $count);

    printf "Count:     %d\n", $count;
    printf "Mean:      %.2f\n", $mean;
    printf "Median:    %.2f\n", $median;
    printf "Min:       %.2f\n", $min;
    printf "Max:       %.2f\n", $max;
    printf "Std Dev:   %.2f\n", $stddev;
}
' numbers.txt
```

#### Word Frequency Analysis
```bash
# Word frequency counter
perl -e '
while (<>) {
    # Extract words (alphanumeric only)
    push @words, lc($1) while /\b([a-zA-Z]+)\b/g;
}

# Count word frequencies
%freq = ();
$freq{$_}++ for @words;

# Sort by frequency (descending)
@sorted = sort { $freq{$b} <=> $freq{$a} } keys %freq;

# Print top 20 words
printf "%-20s %s\n", "Word", "Frequency";
print "-" x 30, "\n";
for $i (0..19) {
    last unless $i < @sorted;
    printf "%-20s %d\n", $sorted[$i], $freq{$sorted[$i]};
}

printf "\nTotal words: %d\n", scalar @words;
printf "Unique words: %d\n", scalar keys %freq;
' document.txt
```

## Integration and Automation

### Shell Integration

#### Pipeline Processing
```bash
# Process CSV data through pipeline
cat data.csv | perl -F',' -lane 'print "$F[0]:$F[2]" if $F[1] > 100' | sort | uniq -c

# Extract and process URLs
grep -o 'https://[^)]*' webpage.html | perl -ne 'print "$1\n" if /(https?:\/\/[^\/]+)/' | sort -u

# System monitoring pipeline
ps aux | perl -ne 'print "$1 $2\n" if /^\s*(\d+)\s+\w+\s+(\d+)/ && $2 > 100000' | sort -nrk2
```

#### Cron Jobs
```bash
# Daily log analysis (add to crontab)
0 6 * * * perl -ne '$count{$1}++ if /\[error\]/; END { mail -s "Error Summary" admin@example.com <<EOF
Yesterday\'s errors:
EOF; printf "%s: %d\n", $_, $count{$_} for keys %count }' /var/log/application.log

# Weekly disk usage report
0 0 * * 0 perl -MFile::Find -e 'find(sub { $total += -s if -f }, "/home"); printf "%.2f GB used in /home\n", $total/1024/1024/1024' | mail -s "Disk Usage Report" admin@example.com
```

### Web Automation

#### Web Scraping
```bash
# Extract titles from web pages
perl -MLWP::UserAgent -MHTML::TreeBuilder -e '
$ua = LWP::UserAgent->new();
for $url (@ARGV) {
    $response = $ua->get($url);
    if ($response->is_success) {
        $tree = HTML::TreeBuilder->new_from_content($response->content);
        $title = $tree->look_down(_tag => "title");
        print "$url: ", $title->as_text, "\n" if $title;
        $tree->delete;
    }
}
' https://example.com https://google.com

# Download images from webpage
perl -MLWP::UserAgent -MHTML::LinkExtor -MURI::URL -e '
$ua = LWP::UserAgent->new();
$p = HTML::LinkExtor->new();
$p->parse_file($ARGV[0]);
$base = $ARGV[0];
for $link ($p->links) {
    ($type, $url) = @$link;
    if ($type eq "img" && $url =~ /\.(jpg|jpeg|png|gif)$/i) {
        $abs_url = URI::URL->new($url, $base)->abs;
        $filename = (split /\//, $abs_url)[-1];
        print "Downloading $filename...\n";
        $ua->mirror($abs_url, $filename);
    }
}
' https://example.com/gallery.html
```

## Performance Optimization

### Memory Management
```bash
# Process large files efficiently (line by line)
perl -ne 'print if /pattern/' huge_file.txt

# Use streaming for XML processing
perl -MXML::Parser -e '
$p = XML::Parser->new(Handlers => {Start => \&start_tag, End => \&end_tag});
$p->parse(*STDIN);

sub start_tag {
    my ($p, $el) = @_;
    print "Found element: $el\n" if $el eq "item";
}
sub end_tag { }
' < large.xml

# Optimize regular expressions
perl -ne 'print if /\b(?:error|warning|critical)\b/i' log.txt  # Non-capturing groups
```

### Parallel Processing
```bash
# Parallel file processing with GNU parallel
find . -name "*.log" | parallel -j4 'perl -ne "print if /ERROR/" {} > {.}_errors.txt'

# Multi-threaded processing with threads module
perl -Mthreads -e '
sub process_file {
    my $file = shift;
    open $fh, "<", $file or return;
    my $count = 0;
    $count++ while <$fh>;
    close $fh;
    return "$file: $count lines\n";
}

@files = glob("*.txt");
@threads = map { threads->create(\&process_file, $_) } @files;
for (@threads) {
    print $_->join;
}
'
```

## Debugging and Testing

### Syntax Checking
```bash
# Check syntax without execution
perl -c script.pl

# Enable strict and warnings
perl -Mstrict -Mwarnings script.pl

# Use debugger
perl -d script.pl

# Enable all warnings
perl -W script.pl
```

### Testing
```bash
# Basic unit test example
perl -MTest::Simple tests => 3 -e '
ok(1 + 1 == 2, "basic addition");
ok(length("hello") == 5, "string length");
ok(defined($ENV{"HOME"}), "HOME environment variable");
'
```

## Security Considerations

### Safe Programming Practices
```bash
# Enable taint mode for security
perl -T script.pl

# Use parameterized database queries
perl -MDBI -e '$dbh = DBI->connect(...); $sth = $dbh->prepare("SELECT * FROM users WHERE id = ?"); $sth->execute($user_id)'

# Avoid shell injection
perl -e 'system("ls", "-l", $filename) instead of system("ls -l $filename")'

# Input validation
perl -ne 'print if /^\d{4}-\d{2}-\d{2}$/'  # Validate date format
```

## Related Commands

- [`awk`](/docs/commands/development/awk) - Text processing with pattern scanning
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text transformation
- [`python`](/docs/commands/development/python) - Python interpreter
- [`ruby`](/docs/commands/development/ruby) - Ruby interpreter
- [`bash`](/docs/commands/shell/bash) - Bourne Again SHell
- [`grep`](/docs/commands/text-processing/grep) - Pattern search utility
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text

## Best Practices

1. **Always enable strict and warnings** with `use strict; use warnings;`
2. **Use lexical variables** (`my`) instead of global variables
3. **Check return values** for system calls and file operations
4. **Use proper error handling** with `eval` or `Try::Tiny`
5. **Validate input data** especially when processing external files
6. **Use CPAN modules** instead of reinventing common functionality
7. **Write readable code** with proper indentation and comments
8. **Use `perl -c`** to check syntax before execution
9. **Enable taint mode** (`-T`) for security-sensitive scripts
10. **Use appropriate data structures** (arrays, hashes, references)

## Performance Tips

1. **Use `while (<>)`** for efficient file processing
2. **Avoid unnecessary variable creation** in loops
3. **Use hash lookups** instead of array searching when possible
4. **Precompile regular expressions** for repeated use
5. **Use `join`** instead of concatenation for strings
6. **Avoid slurping entire files** unless necessary
7. **Use appropriate modules** (e.g., `DBI` for databases)
8. **Profile with `Devel::NYTProf`** to identify bottlenecks
9. **Use ` Readonly`** or `constant` for fixed values
10. **Consider parallel processing** for CPU-intensive tasks

The `perl` command is a versatile programming language interpreter that excels at text processing, system administration, and rapid prototyping. Its powerful regular expression engine, extensive module ecosystem, and flexible syntax make it an ideal tool for developers, system administrators, and data processing tasks. With proper understanding of its features and best practices, Perl can solve complex problems efficiently and effectively.