package org.sonarsource.plugins.lingoport.web;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.Page.Scope;
import org.sonar.api.web.page.PageDefinition;

public class MyPluginPageDefinition implements PageDefinition {

  @Override
  public void define(Context context) {
    context

      .addPage(Page.builder("lingoport/overview_page")
       .setName("Lingoport Overview")
       .setScope(Scope.COMPONENT).build())


      .addPage(Page.builder("lingoport/lrm_page")
        .setName("Resource Manager")
        .setScope(Scope.COMPONENT).build())

      .addPage(Page.builder("lingoport/globalyzer_page")
        .setName("Globalyzer")
        .setScope(Scope.COMPONENT).build());

    //  .addPage(Page.builder("lingoport/control_page")
    //    .setName("Control Center")
    //    .setScope(Scope.COMPONENT).build());

  }
}
