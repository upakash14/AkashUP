<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <div>
      <xsl:for-each select="projects/project">
        <div class="project-card">
          <h3><xsl:value-of select="title"/></h3>
          <p><strong>Role:</strong> <xsl:value-of select="role"/></p>
          <p><strong>Technologies:</strong> <xsl:value-of select="tech"/></p>
          <p><xsl:value-of select="description"/></p>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>

</xsl:stylesheet>
