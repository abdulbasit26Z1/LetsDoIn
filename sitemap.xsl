<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en-GB">
      <head>
        <title>LetsDoIn UK | XML Sitemap</title>
        <meta charset="UTF-8"/>
        <style type="text/css">
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            color: #f8fafc;
            background-color: #0f172a;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background-color: #1e293b;
            border-radius: 16px;
            border: 1px solid #334155;
            padding: 32px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #334155;
            padding-bottom: 20px;
            margin-bottom: 24px;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #1d4ed8, #6366f1, #dc2626);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 18px;
            color: #ffffff;
          }
          h1 {
            font-size: 22px;
            font-weight: 800;
            margin: 0;
            color: #ffffff;
          }
          p.sub {
            font-size: 12px;
            color: #94a3b8;
            margin: 4px 0 0 0;
          }
          .badge {
            background-color: rgba(99, 102, 241, 0.2);
            color: #a5b4fc;
            border: 1px solid rgba(99, 102, 241, 0.4);
            padding: 6px 14px;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background-color: #0f172a;
            color: #94a3b8;
            text-align: left;
            padding: 12px 16px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #334155;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #334155;
            word-break: break-all;
          }
          tr:hover td {
            background-color: rgba(51, 65, 85, 0.5);
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .prio {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 11px;
            background-color: rgba(16, 185, 129, 0.15);
            color: #34d399;
          }
          .footer {
            margin-top: 24px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">
              <div class="brand-logo">UK</div>
              <div>
                <h1>LetsDoIn UK &#8212; Interactive XML Sitemap</h1>
                <p class="sub">Generated for Google, Bing, and search engine crawlers with standard protocol compliance.</p>
              </div>
            </div>
            <div class="badge">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs Indexed
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th width="55%">URL / Location</th>
                <th width="15%">Last Modified</th>
                <th width="15%">Frequency</th>
                <th width="15%">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td style="color: #cbd5e1;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td style="color: #94a3b8; text-transform: capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <span class="prio"><xsl:value-of select="sitemap:priority"/></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer">
            &#169; 2026 LetsDoIn UK. All rights reserved. Search Engine XML Sitemap.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
