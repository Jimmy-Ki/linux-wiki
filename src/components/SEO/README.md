# SEO Components for Linux Wiki Tools

This directory contains the SEO optimization components used across the Linux Wiki tool pages.

## Components Overview

### 1. SEO Component (`index.js`)
Main React component that renders all SEO meta tags and structured data.

**Features:**
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Favicon links
- JSON-LD structured data
- Mobile viewport and character encoding

**Props:**
- `title` (string): Page title (max 60 chars)
- `description` (string): Page description (150-160 chars)
- `keywords` (string): Comma-separated keywords
- `canonicalUrl` (string): Absolute page URL
- `imageUrl` (string): Social sharing image URL
- `type` (string): Page type (website, game, WebApplication)
- `structuredData` (object): JSON-LD structured data
- `locale` (string): Page locale (default: en_US)
- `siteName` (string): Website name

### 2. SEO Configuration (`SEOConfig.js`)
Centralized configuration for all tool pages.

**Contains:**
- Site-wide settings (URL, name, social handles)
- Tool-specific SEO configurations
- Image paths for social sharing
- Default meta tag values

### 3. Structured Data Helpers (`StructuredData.js`)
Utility functions for generating schema.org structured data.

**Available Functions:**
- `generateGameStructuredData()` - For games like 2048
- `generateWebApplicationStructuredData()` - For web tools
- `generateSoftwareStructuredData()` - For software applications
- `generateBreadcrumbStructuredData()` - For breadcrumbs

## Usage Examples

### Basic Usage
```jsx
import SEO from '../SEO';

<SEO
  title="Tool Name | Linux Wiki"
  description="Tool description for SEO"
  keywords="keyword1, keyword2, keyword3"
  canonicalUrl="https://linux.wiki/tools/tool-name"
  imageUrl="/images/tools/tool-og.png"
  type="WebApplication"
/>
```

### With Custom Structured Data
```jsx
import SEO from '../SEO';
import { generateGameStructuredData } from '../SEO/StructuredData';

const structuredData = generateGameStructuredData(
  title,
  description,
  canonicalUrl
);

<SEO
  title={title}
  description={description}
  structuredData={structuredData}
  type="game"
  canonicalUrl={canonicalUrl}
/>
```

## Tool Page Integration

All tool pages should use the `ToolPageWithAds` component which integrates SEO automatically:

```jsx
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';

export default function ToolPage() {
  const seoConfig = SEO_CONFIG.tools.toolName;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/tool-name`;

  return (
    <ToolPageWithAds
      title={seoConfig.title}
      description={seoConfig.description}
      keywords={seoConfig.keywords}
      toolType="WebApplication"
      canonicalUrl={canonicalUrl}
      imageUrl={seoConfig.image}
      breadcrumbs={[
        { name: 'Home', url: SEO_CONFIG.siteUrl },
        { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
        { name: 'Tool Name', url: canonicalUrl }
      ]}
    >
      <ToolComponent />
    </ToolPageWithAds>
  );
}
```

## Schema.org Types Used

### Game Schema
Used for the 2048 game with properties:
- gamePlatform, genre, audience
- additionalProperty for game features
- aggregateRating for social proof

### WebApplication Schema
Used for utility tools with properties:
- applicationCategory, browserRequirements
- featureList, additionalProperty
- operatingSystem, offers

### EducationalApplication Schema
Used for the calculator with properties:
- educationalUse, learningResourceType
- teaches, audience

### DeveloperApplication Schema
Used for technical tools with properties:
- Developer-focused categories
- Programming and development features

## Best Practices

### Title Optimization
- Keep under 60 characters
- Include primary keyword
- Add brand name at the end
- Use pipe (|) as separator

### Description Writing
- 150-160 characters for optimal display
- Include target keywords naturally
- Describe tool benefits and features
- Include call-to-action when appropriate

### Keyword Strategy
- 5-8 relevant keywords per page
- Include primary, secondary, and long-tail terms
- Focus on user intent
- Include location-specific terms when relevant

### Structured Data
- Use specific schema types for each tool
- Include all required properties
- Add optional properties when relevant
- Validate with Google's Rich Results Test

### Image Optimization
- Use 1200x630px for Open Graph images
- Include alt text for accessibility
- Compress images for performance
- Use WebP format when supported

## Testing and Validation

### Tools to Use
1. **Google Rich Results Test** - Validate structured data
2. **Facebook Sharing Debugger** - Check Open Graph tags
3. **Twitter Card Validator** - Verify Twitter Cards
4. **Google Search Console** - Monitor performance
5. **PageSpeed Insights** - Optimize performance

### Validation Checklist
- [ ] Title displays correctly in search results
- [ ] Description fits within character limits
- [ ] Structured data validates without errors
- [ ] Social media previews display correctly
- [ ] Canonical URLs are accessible
- [ ] Images load with proper sizing

## Maintenance

### Regular Updates
- Review and update titles/descriptions quarterly
- Monitor keyword performance and adjust
- Update screenshots when UI changes
- Refresh structured data with new features
- Check for schema.org specification updates

### Performance Monitoring
- Track organic traffic growth
- Monitor rankings for target keywords
- Analyze user engagement metrics
- Review social media share performance
- Check Core Web Vitals scores

This SEO implementation provides comprehensive optimization for all Linux Wiki tool pages, ensuring maximum visibility in search engines and optimal social media sharing experiences.