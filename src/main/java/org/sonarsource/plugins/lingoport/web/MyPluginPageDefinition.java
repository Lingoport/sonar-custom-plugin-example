package org.sonarsource.plugins.lingoport.web;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.Page.Scope;
import org.sonar.api.web.page.PageDefinition;

public class MyPluginPageDefinition implements PageDefinition {

  @Override
  public void define(Context context) {
    context
      .addPage(Page.builder("lingoport/custom_page_4_project")
        .setName("Resource Manager")
        .setScope(Scope.COMPONENT).build())

      .addPage(Page.builder("lingoport/globalyzer_page")
        .setName("Globalyzer")
        .setScope(Scope.COMPONENT).build())

      .addPage(Page.builder("lingoport/custom_page_4_admin")
        .setName("Custom Admin Page")
        .setScope(Scope.GLOBAL)
        .setAdmin(Boolean.TRUE).build())


      .addPage(Page.builder("lingoport/custom_page_global")
        .setName("Custom Global Page")
        .setScope(Scope.GLOBAL).build());
  }
}
