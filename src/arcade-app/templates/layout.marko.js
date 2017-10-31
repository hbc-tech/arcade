// Compiled using marko@4.4.28 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_forEach = marko_helpers.f,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_attr = marko_helpers.a,
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_str = marko_helpers.s,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!doctype><html><head><title>" +
    marko_escapeXml(input.title) +
    "</title>");

  marko_forEach(input.head.links, function(link) {
    out.w("<link rel=\"" +
      marko_escapeXmlAttr(link.rel) +
      "\" href=\"" +
      marko_escapeXmlAttr(link.href) +
      "\">");
  });

  marko_forEach(input.scripts.head, function(script) {
    out.w("<script" +
      marko_attr("id", script.id) +
      marko_attr("type", script.type) +
      " src=\"" +
      marko_escapeXmlAttr(script.src) +
      "\"></script>");
  });

  out.w("</head><body>");

  component_globals_tag({}, out);

  marko_forEach(input.scripts.body.start, function(script) {
    out.w("<script" +
      marko_attr("id", script.id) +
      marko_attr("type", script.type) +
      " src=\"" +
      marko_escapeXmlAttr(script.src) +
      "\"></script>");
  });

  out.w(marko_str(input.header) +
    "<main>" +
    marko_str(input.main) +
    "</main>" +
    marko_str(input.footer));

  marko_forEach(input.scripts.body.end, function(script) {
    out.w("<script" +
      marko_attr("id", script.id) +
      marko_attr("type", script.type) +
      " src=\"" +
      marko_escapeXmlAttr(script.src) +
      "\"></script>");
  });

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
