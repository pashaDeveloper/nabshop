/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import { DataFilter, DataSchema, FullPage, GeneralHtmlSupport, HtmlComment } from "@ckeditor/ckeditor5-html-support";
import { AutoImage, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { TextPartLanguage } from "@ckeditor/ckeditor5-language";
import { AutoLink, Link, LinkImage } from "@ckeditor/ckeditor5-link";
import { List, TodoList } from "@ckeditor/ckeditor5-list";
import { MediaEmbed, MediaEmbedToolbar } from "@ckeditor/ckeditor5-media-embed";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { PageBreak } from "@ckeditor/ckeditor5-page-break";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { StandardEditingMode } from "@ckeditor/ckeditor5-restricted-editing";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import { ShowBlocks } from "@ckeditor/ckeditor5-show-blocks";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText } from "@ckeditor/ckeditor5-special-characters";
import { Style } from "@ckeditor/ckeditor5-style";
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { AccessibilityHelp } from "@ckeditor/ckeditor5-ui";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof AccessibilityHelp | typeof Alignment | typeof AutoImage | typeof AutoLink | typeof Autoformat | typeof Autosave | typeof SimpleUploadAdapter | typeof BlockQuote | typeof Bold | typeof Code | typeof CodeBlock | typeof DataFilter | typeof DataSchema | typeof FindAndReplace | typeof FontBackgroundColor | typeof FontColor | typeof FontFamily | typeof FontSize | typeof FullPage | typeof GeneralHtmlSupport | typeof Heading | typeof Highlight | typeof HorizontalLine | typeof HtmlComment | typeof HtmlEmbed | typeof Image | typeof ImageCaption | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Italic | typeof TodoList | typeof Link | typeof LinkImage | typeof MediaEmbed | typeof MediaEmbedToolbar | typeof Mention | typeof PageBreak | typeof Paragraph | typeof RemoveFormat | typeof SelectAll | typeof ShowBlocks | typeof SourceEditing | typeof List | typeof SpecialCharacters | typeof SpecialCharactersArrows | typeof SpecialCharactersCurrency | typeof SpecialCharactersEssentials | typeof SpecialCharactersLatin | typeof SpecialCharactersMathematical | typeof SpecialCharactersText | typeof StandardEditingMode | typeof Strikethrough | typeof Style | typeof Subscript | typeof Superscript | typeof Table | typeof TableCaption | typeof TableCellProperties | typeof TableColumnResize | typeof TableProperties | typeof TableToolbar | typeof TextPartLanguage | typeof TextTransformation | typeof Underline | typeof Undo)[];
    static defaultConfig: EditorConfig;
}
export default Editor;
