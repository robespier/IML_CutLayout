interface Application {
  /**
   * The active (frontmost) document in Illustrator.
   */
  activeDocument: Document;

  /**
   * The documents in the application.
   *
   * @readonly
   */
  documents: Documents;

  /**
   * Opens the file specified by the string with the specified color space and
   * options. If you open a pre-Illustrator 9 document that contains both RGB
   * and CMYK colors and documentColorSpace is supplied, all colors are
   * converted to the specified color space. If the parameter is not supplied,
   * Illustrator opens a dialog so the user can choose the color space.
   *
   * @param {FileInstance} filename
   * @param {DocumentColorSpace} [documentColorSpace],
   * @param {Object} [options]
   *
   */
  open(filename: FileInstance, documentColorSpace?: DocumentColorSpace, options?): Document;

  /**
   * What level of interaction with the user should be allowed when handling
   * script commands.
   */
  userInteractionLevel: UserInteractionLevel;
}

declare var app: Application;

interface Brushes {
}

interface CharacterStyles {}

declare class GradientColor {
  /**
   * The gradient vector angle in degrees. Default: 0.0
   */
  angle: number;

  /**
   * Reference to the object defining the gradient.
   */
  gradient: Gradient;

  /**
   * The gradient highlight vector angle in degrees.
   */
  hiliteAngle: number;

  /**
   * The gradient highlight vector length.
   */
  hiliteLength: number;

  /**
   * The gradient vector length.
   */
  length: number;

  /**
   * An additional transformation matrix to manipulate the gradient path.
   */
  matrix: Matrix;

  /**
   * The gradient vector origin, the center point of the gradient in numbers
   * this color.
   */
  origin: number[];

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class CMYKColor {
  /**
   * The cyan color value. Range 0.0–100.0. Default: 0.0
   */
  cyan: number;

  /**
   * The magenta color value. Range 0.0–100.0. Default: 0.0
   */
  magenta: number;

  /**
   * The yellow color value. Range 0.0–100.0. Default: 0.0
   */
  yellow: number;

  /**
   * The black color value. Range 0.0–100.0. Default: 0.0
   */
  black: number;
}

declare class GrayColor {
  /**
   * The tint of the gray. Range: 0.0 to 100.0, where 0.0 is black
   * and 100.0 is white.
   */
  gray: number;

  /**
   * Read-only.
   * The class name of the referenced object.
   */
  typename: string;
}

declare class LabColor {
  /**
   * The a (red-green) color value. Range -128.0–128.0. Default: 0.0
   */
  a: number;

  /**
   * The b (yellow-blue) color value. Range -128.0–128.0. Default: 0.0
   */
  b: number;

  /**
   * The l (lightness) color value. Range -128.0–128.0. Default: 0.0
   */
  l: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class NoColor {
  /**
   * The class name of the object
   *
   * @readonly
   */
  typename: string;
}

declare class PatternColor {
  /**
   * Additional transformation arising from manipulating the path.
   */
  matrix: Matrix;

  /**
   * A reference to the pattern object that defines the pattern to use in this
   * color definition.
   */
  pattern: Pattern;

  /**
   * If true, the prototype should be reflected before filling. Default: false
   */
  reflect: boolean;

  /**
   * The axis around which to reflect, in points. Default: 0.0
   */
  reflectAngle: number;

  /**
   * The angle in radians to rotate the prototype pattern before filling.
   * Default: 0.0
   */
  rotation: number;

  /**
   * The fraction to which to scale the prototype pattern before filling,
   * represented as a point containing horizontal and vertical scaling
   * percentages.
   */
  scaleFactor: number[];

  /**
   * The angle in radians by which to slant the shear. Default: 0.0
   */
  shearAngle: number;

  /**
   * The axis to shear with respect to, in points. Default: 0.0
   */
  shearAxis: number;

  /**
   * The angle in radians to which to translate the unscaled prototype pattern
   * before filling. Default: 0.0
   */
  shiftAngle: number

  /**
   * The distance in points to which to translate the unscaled prototype pattern
   * before filling. Default: 0.0
   */
  shiftDistance: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class RGBColor {
  /**
   * The blue color value. Range: 0.0 to 255.0
   */
  blue: number;

  /**
   * The green color value. Range: 0.0 to 255.0
   */
  green: number;

  /**
   * The red color value. Range: 0.0 to 255.0
   */
  red: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class SpotColor {
  /**
   * A reference to the spot color object that defines the color.
   */
  spot: Spot;

  /**
   * The tint of the color. Range: 0.0 to 100.0
   */
  tint: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string
}

declare type Color = CMYKColor | GrayColor | LabColor | NoColor | PatternColor | RGBColor | SpotColor;

declare type XOrd = number;
declare type YOrd = number;
declare type Point = [XOrd, YOrd];

interface Props<P> {
  /**
   * The number of objects in the collection.
   *
   * @readonly
   */
  length: number;

  /**
   * The parent of this object.
   *
   * @readonly
   */
  parent: P;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

interface CollectionIterable<T> {
  /**
   * Gets an element from the collection.
   *
   * @param {number} index
   * @returns {Document}
   */
  [index: number]: T;
}

/**
 * Generic collections
 */
interface Collection<T> extends CollectionIterable<T> {
  /**
   * Creates a new object.
   */
  add(): T;

  /**
   * Gets the first element in the collection with the provided name.
   *
   * @param {string} name
   * @returns {Object}
   */
  getByName(name: string): T;

  /**
   * Deletes all elements in this collection.
   */
  removeAll(): void;
}

interface GraphicStyles extends Collection<GraphicStyle> {} // @fixme no `add` here
interface Layers extends Collection<Layer> {}
interface PathPoints extends Collection<PathPoint> {}
interface PlacedItems extends Collection<PlacedItem> {}

interface GraphicStyle {
  name: string;
  parent: Document;
  typename: string;
  applyTo(artItem: PlacedItem): void;
  mergeTo(artItem: PathItem): void;
  remove();
}

interface Layer {
  name: string;
  parent: Document | Layer;
  pathItems: PathItems;
  placedItems: PlacedItems;
  zOrder(position: ZOrderMethod): void;
}

interface PathPoint {
  anchor: number[];
  leftDirection: number[];
  rightDirection: number[];
  pointType: PointType;
}

declare class PDFSaveOptions {
  new(): PDFSaveOptions;
  acrobatLayers: boolean;
}

interface PlacedItem {
  file: FileInstance;
  height: number;
  parent: Layer;
  position: Point;
  remove(): void;
  resize(scaleX: number, scaleY: number, ...additionals: boolean[]): void; // @fixme incomplete
  width: number;
}

interface CompoundPathItems {
}

interface DataSet {
  /**
   * Then name of the dataset.
   */
  name: string;

  /**
   * The name of the object that contains this dataset.
   *
   * @readonly
   */
  parent: Document;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;

  /**
   * Displays the dataset.
   */
  display(): void;

  /**
   * Deletes this object.
   */
  remove(): void;

  /**
   * Updates the dataset.
   */
  update(): void;
}

interface Datasets extends Props<Document>, Collection<DataSet> {
}

interface Document {
  /**
   * The currently opened dataset.
   */
  activeDataset: DataSet;

  /**
   * The active layer in the document.
   */
  activeLayer: Layer;

  /**
   * The document’s current view.
   *
   * @readonly
   */
  activeView: View;

  /**
   * The brushes contained in the document.
   *
   * @readonly
   */
  brushes: Brushes;

  /**
   * The list of character styles in this document.
   *
   * @readonly
   */
  characterStyles: CharacterStyles;

  /**
   * The compound path items contained in the document.
   *
   * @readonly
   */
  compoundPathItems: CompoundPathItems;

  /**
   * The boundary of the document’s cropping box for output, or `null` if no
   * value has been set.
   */
  cropBox: number[];

  /**
   * The style of the document’s cropping box.
   */
  cropStyle: CropOptions;

  /**
   * The datasets contained in the document.
   *
   * @readonly
   */
  dataSets: Datasets;

  /**
   * The color to use to fill new paths if defaultFilled is true.
   */
  defaultFillColor: Color;

  /**
   * If true, a new path should be filled.
   */
  defaultFilled: boolean;

  /**
   * If true, the art beneath a filled object should be overprinted by default.
   */
  defaultFillOverprint: boolean;

  /**
   * Default type of line capping for paths created.
   */
  defaultStrokeCap: StrokeCap;

  /**
   * The stroke color for new paths if default stroked is true.
   */
  defaultStrokeColor: Color;

  /**
   * If true, a new path should be stroked.
   */
  defaultStroked: boolean;

  /**
   * Default lengths for dashes and gaps in dashed lines, starting with the
   * first dash length, followed by the first gap length, and so on. Set to
   * an empty object, {}, for solid line.
   */
  defaultStrokeDashes: Object; // @fixme

  /**
   * The default distance into the dash pattern at which the pattern should
   * be started for new paths.
   */
  defaultStrokeDashOffset: number;

  /**
   * Default type of joints in new paths.
   */
  defaultStrokeJoin: StrokeJoin;

  /**
   * When a default stroke join is set to mitered, this property specifies
   * when the join will be converted to beveled (squared-off) by default.
   * The default miter limit of 4 means that when the length of the point
   * reaches four times the stroke weight, the join switches from a miter
   * join to a bevel join. Range: 1 to 500; a value of 1 specifies a bevel join.
   */
  defaultStrokeMiterLimit: number;

  /**
   * If true, the art beneath a stroked object should be overprinted by default.
   */
  defaultStrokeOverprint: boolean;

  /**
   * Default width of stroke for new paths.
   */
  defaultStrokeWidth: number;

  /**
   * The color specification system to use for this document’s color space.
   *
   * @readonly
   */
  documentColorSpace: DocumentColorSpace;

  /**
   * The file associated with the document, which includes the complete path to
   * the file.
   *
   * @readonly
   */
  fullName: FileInstance;

  /**
   * The bounds of the illustration excluding the stroke width of any objects
   * in the document.
   *
   * @readonly
   */
  geometricBounds: number[];

  /**
   * The gradients contained in the collection object document.
   *
   * @readonly
   */
  gradients: Gradients;

  /**
   * The graphic styles defined in this collection object document.
   *
   * @readonly
   */
  graphicStyles: GraphicStyles;

  /**
   * The graph art items in this collection object document.
   *
   * @readonly
   */
  graphItems: GraphItems;

  /**
   * The group items contained in the collection object document.
   *
   * @readonly
   */
  groupItems: GroupItems;

  /**
   * The height of the document.
   *
   * @readonly
   */
  height: number;

  /**
   * The list of inks in this document.
   *
   * @readonly
   */
  inkList: Object;

  /**
   * The Kinsoku set of characters that cannot begin or end a line of Japanese
   * text.
   *
   * @readonly
   */
  kinsokuSet: Object;

  /**
   * The layers contained in the object document.
   *
   * @readonly
   */
  layers: Layers;

  /**
   * The legacy text items in the collection object document.
   *
   * @readonly
   */
  legacyTextItems: LegacyTextItems;

  /**
   * The mesh art items contained in the collection object document.
   *
   * @readonly
   */
  meshItems: MeshItems;

  /**
   * A list of names of predefined Mojikumi sets which specify the spacing for
   * the layout and composition of Japanese text.
   *
   * @readonly
   */
  mojikumiSet: Object;

  /**
   * The document’s name (not the complete file path to the document).
   *
   * @readonly
   */
  name: string;

  /**
   * The current output resolution for the document in dots per inch (dpi).
   *
   * @readonly
   */
  outputResolution: number;

  /**
   * The page items (all art item classes) collection object contained
   * in the document.
   *
   * @readonly
   */
  pageItems: PageItems;

  /**
   * The zero-point of the page in the document without margins, relative to
   * the overall height and width.
   */
  pageOrigin: number[];

  /**
   * The list of paragraph styles in this collection object document.
   *
   * @readonly
   */
  paragraphStyles: ParagraphStyles;

  /**
   * The application that contains this document.
   *
   * @readonly
   */
  parent: Application;

  /**
   * The file associated with the document, which includes the complete path
   * to the file.
   *
   * @readonly
   */
  path: FileInstance;

  /**
   * The path items contained in this collection object document.
   *
   * @readonly
   */
  pathItems: PathItems;

  /**
   * The patterns contained in this object document.
   *
   * @readonly
   */
  patterns: Patterns;

  /**
   * The placed items contained in this collection object document.
   *
   * @readonly
   */
  placedItems: PlacedItems;

  /**
   * The plugin items contained in this collection object document.
   *
   * @readonly
   */
  pluginItems: PluginItems;

  /**
   * If true, this document should be printed as tiled output.
   *
   * @readonly
   */
  printTiles: boolean;

  /**
   * The raster items contained in this collection object document.
   *
   * @readonly
   */
  rasterItems: RasterItems;

  /**
   * The zero-point of the rulers in the document relative to the bottom left
   * of the document.
   */
  rulerOrigin: number[];

  /**
   * The default measurement units for the rulers in the document.
   *
   * @readonly
   */
  rulerUnits: RulerUnits;

  /**
   * If true, the document has not been changed since last time it was saved.
   */
  saved: boolean;

  /**
   * References to the objects in this document’s current selection, or null
   * when nothing is selected. A reference to an insertion point is returned
   * when there is an active insertion point in the contents of a selected
   * text art item. Similarly, a reference to a range of text is returned when
   * characters are selected in the contents of a text art item.
   */
  selection: PathItem[]; // @fixme

  /**
   * If true, placed images should be displayed in the document.
   *
   * @readonly
   */
  showPlacedImages: boolean;

  /**
   * If true, long paths should be split when printing.
   *
   * @readonly
   */
  splitLongPaths: boolean;

  /**
   * The spot colors contained in this object document.
   *
   * @readonly
   */
  spots: Spots;

  /**
   * If true, the file is a stationery file.
   *
   * @readonly
   */
  stationery: boolean;

  /**
   * The story items in this document.
   *
   * @readonly
   */
  stories: Stories;

  /**
   * The swatches contained in this object document.
   *
   * @readonly
   */
  swatches: Swatches;

  /**
   * The art items in the document collection object linked to symbols.
   *
   * @readonly
   */
  symbolItems: SymbolItems;

  /**
   * The symbols contained in this object document.
   *
   * @readonly
   */
  symbols: Symbols;

  /**
   * The tags contained in this object document.
   *
   * @readonly
   */
  tags: Tags;

  /**
   * The text frames contained in this collection object document.
   *
   * @readonly
   */
  textFrames: TextFrames;

  /**
   * If true, full pages should be tiled when printing this document.
   *
   * @readonly
   */
  tileFullPages: boolean;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;

  /**
   * If true, the printer’s default screen should be used when printing
   * this document.
   *
   * @readonly
   */
  useDefaultScreen: boolean;

  /**
   * The variables defined in this collection object document.
   *
   * @readonly
   */
  variables: Variables;

  /**
   * If true, the variables are locked.
   */
  variablesLocked: boolean;

  /**
   * The views contained in this object document.
   *
   * @readonly
   */
  views: Views;

  /**
   * The visible bounds of the document, including stroke width of any objects
   * in the illustration.
   *
   * @readonly
   */
  visibleBounds: number[];

  /**
   * The width of this document.
   *
   * @readonly
   */
  width: number;

  /**
   * The XMP metadata packet associated with this document.
   */
  XMPString: string;

  /**
   * Brings the first window associated with the document to the front.
   */
  activate(): void;

  /**
   * Closes a document using specified save options. When you close a document,
   * you should set your document reference to null to prevent your script from
   * accidentally trying to access closed documents.
   *
   * @param {SaveOptions} [options]
   */
  close(options?: SaveOptions): void;

  /**
   * Exports the document to the specified file using one of the predefined
   * export file formats. The appropriate file extension is automatically
   * appended to the file name, except for Photoshop® documents. For these,
   * you must include the file extension (PSD) in the file specification.
   *
   * @param {FileInstance} exportFile
   * @param {ExportType} exportFormat
   * @param {ExportOptions} [options]
   */
  exportFile(exportFile: FileInstance, exportFormat: ExportType, options?: ExportOptions): void;

  /**
   * Exports the current PDF preset values to the file.
   *
   * @param {FileInstance} file
   */
  exportPDFPreset(file: FileInstance): void;

  /**
   * Exports the current print preset values to the file.
   *
   * @param {FileInstance} file
   */
  exportPrintPreset(file: FileInstance): void;

  /**
   * Saves datasets into an XML library. The datasets contain variables and
   * their associated dynamic data.
   *
   * @param {FileInstance} file
   */
  exportVariables(file: FileInstance): void;

  /**
   * Captures the artwork content within the clipping boundaries in this
   * document as a raster image, and writes the image data to a specified file.
   * If the bounds parameter is omitted, captures the entire artwork.
   *
   * @param {FileInstance} imageFile
   * @param {Array} [clipBounds]
   * @param {ImageCaptureOptions} [options]
   */
  imageCapture(imageFile: FileInstance, clipBounds?: number[], options?: ImageCaptureOptions): void;

  /**
   * Loads the character styles from the Illustrator file.
   *
   * @param {FileInstance} file
   */
  importCharacterStyles(file: FileInstance): void;

  /**
   * Loads the paragraph styles from the Illustrator file.
   *
   * @param {FileInstance} file
   */
  importParagraphStyles(file: FileInstance): void;

  /**
   * Loads all PDF presets from a file.
   *
   * @param {FileInstance} file
   * @param {boolean} [replacingPreset]
   */
  importPDFPreset(file: FileInstance, replacingPreset?: boolean): void;

  /**
   * Loads the named print preset from the file.
   *
   * @param {string} printPreset
   * @param {FileInstance} file
   */
  importPrintPreset(printPreset: string, file: FileInstance): void;

  /**
   * Imports a library containing datasets, variables, and their associated
   * dynamic data. Importing variables overwrites existing variables and
   * datasets.
   *
   * @param {FileInstance} file
   */
  importVariables(file: FileInstance): void;

  /**
   * Prints the document.
   *
   * @param {PrintOptions} [options]
   */
  print(options?: PrintOptions): void;

  /**
   * Saves the document in it current location.
   */
  save(): void;

  /**
   * Saves the document in the specified file as an Illustrator, EPS,
   * or PDF file.
   *
   * @param {FileInstance} saveIn
   * @param {SaveOptions} options
   */
  saveAs(saveIn: FileInstance, options?: SaveOptions): void;
}

interface Documents extends Props<Application>, CollectionIterable<Document> {
  /**
   * Creates a new document using optional parameters and returns a reference
   * to the new document.
   *
   * @example
   * // Creates a new document with an RGB color space
   * app.documents.add( DocumentColorSpace.RGB );
   *
   * @param {DocumentColorSpace} [colorSpace]
   * @param {number} [width]
   * @param {number} [height]
   * @returns {Document}
   */
  add(colorSpace?: DocumentColorSpace, width?: number, height?: number): Document;

  /**
   * Creates a new document using optional parameters and returns a reference
   * to the new document.
   *
   * @param {string} startupPreset
   * @param {DocumentPreset} presetSettings
   * @returns {Document}
   */
  addDocument(startupPreset: string, presetSettings: DocumentPreset): Document;

  /**
   * Gets the first element in the collection with the specified name.
   *
   * @param {string} name
   * @returns {Document}
   */
  getByName(name: string): Document;
}

interface DocumentPreset {
  /**
   * The color space for the new document.
   *
   * @param {DocumentColorSpace} colorMode
   */
  colorMode: DocumentColorSpace;

  /**
   * The height in document points. Default: 792.0
   *
   * @param {number} height
   */
  height: number;

  /**
   * The preview mode for the new document.
   *
   * @param {DocumentPreviewMode} previewMode
   */
  previewMode: DocumentPreviewMode;

  /**
   * The raster resolution for the new document.
   *
   * @param {DocumentRasterResolution} rasterResolution
   */
  rasterResolution: DocumentRasterResolution;

  /**
   * The document title.
   *
   * @param {string} title
   */
  title: string;

  /**
   * The transparency grid color for the new document.
   *
   * @param {DocumentTransparencyGrid} transparencyGrid
   */
  transparencyGrid: DocumentTransparencyGrid;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename?: string;

  /**
   * The ruler units for the new document.
   *
   * @param {RulerUnits} units
   */
  units: RulerUnits;

  /**
   * The width in document points. Default: 612.0
   *
   * @param {number} width
   */
  width: number;
}

interface DocumentPresetConstructor {
  new(): DocumentPreset;
}

declare var DocumentPreset: DocumentPresetConstructor;

/**
 *
 *
 */
declare enum AlternateGlyphsForm {
  DEFAULTFORM,
  EXPERT,
  FULLWIDTH,
  HALFWIDTH,
  JIS78FORM,
  JIS83FORM,
  PROPORTIONALWIDTH,
  QUARTERWIDTH,
  THIRDWIDTH,
  TRADITIONAL
}

/**
 * How the art should be clipped during output.
 *
 * OUTPUTARTBOUNDS = Output size is the size of the artwork.
 *
 * OUTPUTARTBOARDBOUNDS = Output size is the size of the artboard.
 *
 * OUTPUTCROPRECTBOUNDS = Output size is the size of the crop area.
 *
 */
declare enum ArtClippingOption {
  OUTPUTARTBOUNDS,
  OUTPUTARTBOARDBOUNDS,
  OUTPUTCROPRECTBOUNDS
}

/**
 *
 *
 */
declare enum AutoCADColors {
  Max8Colors,
  Max16Colors,
  Max256Colors,
  TrueColors
}

/**
 *
 *
 */
declare enum AutoCADCompatibility {
  AutoCADRelease13,
  AutoCADRelease14,
  AutoCADRelease15,
  AutoCADRelease18
}

/**
 *
 *
 */
declare enum AutoCADExportFileFormat {
  DXF,
  DWG
}

/**
 *
 *
 */
declare enum AutoCADExportOption {
  PreserveAppearance,
  MaximumEditability
}

/**
 *
 *
 */
declare enum AutoCADGlobalScaleOption {
  OriginalSize,
  FitArtboard,
  ScaleByValue
}

/**
 *
 *
 */
declare enum AutoCADRasterFormat {
  PNG,
  JPEG
}

/**
 *
 *
 */
declare enum AutoCADUnit {
  Points,
  Picas,
  Inches,
  Millimeters,
  Centimeters,
  Pixels
}

/**
 *
 *
 */
declare enum AutoKernType {
  AUTO,
  NOAUTOKERN,
  OPTICAL
}

/**
 *
 *
 */
declare enum AutoLeadingType {
  BOTTOMTOBOTTOM,
  TOPTOTOP
}

/**
 *
 *
 */
declare enum BaselineDirectionType {
  Standard,
  TateChuYoko,
  VerticalRotated
}

/**
 *
 *
 */
declare enum BlendAnimationType {
  INBUILD,
  INSEQUENCE,
  NOBLENDANIMATION
}

/**
 * The blend mode used when compositing an object.
 *
 */
declare enum BlendModes {
  COLORBLEND,
  COLORBURN,
  COLORDODGE,
  DARKEN,
  DIFFERENCE,
  EXCLUSION,
  HARDLIGHT,
  HUE,
  LIGHTEN,
  LUMINOSITY,
  MULTIPLY,
  NORMAL,
  OVERLAY,
  SATURATIONBLEND,
  SCREEN,
  SOFTLIGHT
}

/**
 *
 *
 */
declare enum BurasagariTypeEnum {
  Forced,
  None,
  Standard
}

/**
 *
 *
 */
declare enum CaseChangeType {
  LOWERCASE,
  SENTENCECASE,
  TITLECASE,
  UPPERCASE
}

/**
 *
 *
 */
declare enum ColorConversion {
  COLORCONVERSIONREPURPOSE,
  COLORCONVERSIONTODEST,
  None
}

/**
 *
 *
 */
declare enum ColorDestination {
  COLORDESTINATIONDOCCMYK,
  COLORDESTINATIONDOCRGB,
  COLORDESTINATIONPROFILE,
  COLORDESTINATIONWORKINGCMYK,
  COLORDESTINATIONWORKINGRGB,
  None
}

/**
 * The method used to dither colors in exported GIF and PNG8 images.
 *
 */
declare enum ColorDitherMethod {
  DIFFUSION,
  NOISE,
  NOREDUCTION,
  PATTERNDITHER
}

/**
 *
 *
 */
declare enum ColorModel {
  PROCESS,
  REGISTRATION,
  SPOT
}

/**
 *
 *
 */
declare enum ColorProfile {
  INCLUDEALLPROFILE,
  INCLUDEDESTPROFILE,
  INCLUDERGBPROFILE,
  LEAVEPROFILEUNCHANGED,
  None
}

/**
 * The method used to reduce the number of colors in exported GIF and
 * PNG8 images.
 *
 */
declare enum ColorReductionMethod {
  ADAPTIVE,
  PERCEPTUAL,
  SELECTIVE,
  WEB
}

/**
 * The color specification for an individual color.
 *
 */
declare enum ColorType {
  CMYK,
  GRADIENT,
  GRAY,
  NONE,
  PATTERN,
  RGB,
  SPOT
}

/**
 * The version of the Illustrator file to create when saving an EPS or
 * Illustrator file
 *
 */
declare enum Compatibility {
  ILLUSTRATOR10,
  ILLUSTRATOR11,
  ILLUSTRATOR12,
  ILLUSTRATOR13,
  ILLUSTRATOR8,
  ILLUSTRATOR9,
  JAPANESEVERSION3
}

/**
 * The quality of bitmap compression used when saving a PDF file
 *
 */
declare enum CompressionQuality {
  AUTOMATICJPEG2000HIGH,
  AUTOMATICJPEG2000LOSSLESS,
  AUTOMATICJPEG2000LOW,
  AUTOMATICJPEG2000MAXIMUM,
  AUTOMATICJPEG2000MEDIUM,
  AUTOMATICJPEG2000MINIMUM,
  AUTOMATICJPEGHIGH,
  AUTOMATICJPEGLOW,
  AUTOMATICJPEGMAXIMUM,
  AUTOMATICJPEGMEDIUM,
  AUTOMATICJPEGMINIMUM,
  JPEG2000HIGH,
  JPEG2000LOSSLESS,
  JPEG2000LOW,
  JPEG2000MAXIMUM,
  JPEG2000MEDIUM,
  JPEG2000MINIMUM,
  JPEGHIGH,
  JPEGLOW,
  JPEGMAXIMUM,
  JPEGMEDIUM,
  JPEGMINIMUM,
  None,
  ZIP4BIT,
  ZIP8BIT
}

/**
 * The style of a document’s cropping box
 *
 */
declare enum CropOptions {
  Japanese,
  Standard
}

/**
 * The color space of a document
 *
 */
declare enum DocumentColorSpace {
  CMYK,
  RGB
}

/**
 * The preset types available for new documents.
 *
 */
declare enum DocumentPresetType {
  BasicCMYK,
  BasicRGB,
  Mobile,
  Print,
  Video,
  Web
}

/**
 * The document preview mode
 *
 */
declare enum DocumentPreviewMode {
  DefaultPreview,
  OverprintPreview,
  PixelPreview
}

/**
 * The preset document raster resolution
 *
 */
declare enum DocumentRasterResolution {
  HighResolution,
  MediumResolution,
  ScreenResolution
}

/**
 * Document transparency grid colors
 *
 */
declare enum DocumentTransparencyGrid {
  TransparencyGridBlue,
  TransparencyGridDark,
  TransparencyGridGreen,
  TransparencyGridLight,
  TransparencyGridMedium,
  TransparencyGridNone,
  TransparencyGridOrange,
  TransparencyGridPurple,
  TransparencyGridRed
}

/**
 * The file format used to save a file
 *
 */
declare enum DocumentType {
  EPS,
  ILLUSTRATOR,
  PDF
}

/**
 *
 *
 */
declare enum DownsampleMethod {
  AVERAGEDOWNSAMPLE,
  BICUBICDOWNSAMPLE,
  NODOWNSAMPLE,
  SUBSAMPLE
}

/**
 *
 *
 */
declare enum EPSPostScriptLevelEnum {
  LEVEL2,
  LEVEL3
}

/**
 * The preview image format used when saving an EPS file
 *
 */
declare enum EPSPreview {
  BWMACINTOSH,
  BWTIFF,
  COLORMACINTOSH,
  COLORTIFF,
  None,
  TRANSPARENTCOLORTIFF
}

/**
 *
 *
 */
declare enum ElementPlacement {
  INSIDE,
  PLACEAFTER,
  PLACEATBEGINNING,
  PLACEATEND,
  PLACEBEFORE
}

/**
 * The file format used to export a file
 *
 */
declare enum ExportType {
  AutoCAD,
  FLASH,
  GIF,
  JPEG,
  PHOTOSHOP,
  PNG24,
  PNG8,
  SVG
}

/**
 *
 *
 */
declare enum FigureStyleType {
  DEFAULTFIGURESTYLE,
  PROPORTIONAL,
  PROPORTIONALOLDSTYLE,
  TABULAR,
  TABULAROLDSTYLE
}

/**
 * The method used to convert Illustrator images when exporting files
 *
 */
declare enum FlashExportStyle {
  ASFLASHFILE,
  LAYERSASFILES,
  LAYERSASFRAMES,
  LAYERSASSYMBOLS
}

/**
 * Version for exported SWF file
 *
 */
declare enum FlashExportVersion {
  FlashVersion1,
  FlashVersion2,
  FlashVersion3,
  FlashVersion4,
  FlashVersion5,
  FlashVersion6,
  FlashVersion7,
  FlashVersion8,
  FlashVersion9
}

/**
 * The format used to store flash images
 *
 */
declare enum FlashImageFormat {
  LOSSLESS,
  LOSSY
}

/**
 * The method used to store JPEG images
 *
 */
declare enum FlashJPEGMethod {
  Optimized,
  Standard
}

/**
 *
 *
 */
declare enum FlashPlaybackSecurity {
  PlaybackLocal,
  PlaybackNetwork
}

/**
 *
 *
 */
declare enum FontBaselineOption {
  NORMALBASELINE,
  SUBSCRIPT,
  SUPERSCRIPT
}

/**
 *
 *
 */
declare enum FontCapsOption {
  ALLCAPS,
  ALLSMALLCAPS,
  NORMALCAPS,
  SMALLCAPS
}

/**
 *
 *
 */
declare enum FontOpenTypePositionOption {
  DENOMINATOR,
  NUMERATOR,
  OPENTYPEDEFAULT,
  OPENTYPESUBSCRIPT,
  OPENTYPESUPERSCRIPT
}

/**
 *
 *
 */
declare enum FontSubstitutionPolicy {
  SUBSTITUTEDEVICE,
  SUBSTITUTEOBLIQUE,
  SUBSTITUTETINT
}

/**
 * The type of gradient
 *
 */
declare enum GradientType {
  LINEAR,
  RADIAL
}

/**
 * The color space of a raster item or an exported Photoshop 5 file
 *
 */
declare enum ImageColorSpace {
  CMYK,
  DeviceN,
  Grayscale,
  Indexed,
  LAB,
  RGB,
  Separation
}

/**
 *
 *
 */
declare enum InkPrintStatus {
  CONVERTINK,
  DISABLEINK,
  ENABLEINK
}

/**
 *
 *
 */
declare enum InkType {
  BLACKINK,
  CUSTOMINK,
  CYANINK,
  MAGENTAINK,
  YELLOWINK
}

/**
 *
 *
 */
declare enum JavaScriptExecutionMode {
  BeforeRunning,
  OnRuntimeError,
  never
}

/**
 * The alignment or justification for a paragraph of text
 *
 */
declare enum Justification {
  CENTER,
  FULLJUSTIFY,
  FULLJUSTIFYLASTLINECENTER,
  FULLJUSTIFYLASTLINELEFT,
  FULLJUSTIFYLASTLINERIGHT,
  LEFT,
  RIGHT
}

/**
 *
 *
 */
declare enum KinsokuOrderEnum {
  PUSHIN,
  PUSHOUTFIRST,
  PUSHOUTONLY
}

/**
 * The type of knockout to use on a page item
 *
 */
declare enum KnockoutState {
  DISABLED,
  ENABLED,
  INHERITED,
  Unknown
}

/**
 *
 *
 */
declare enum LanguageType {
  BOKMALNORWEGIAN,
  BRAZILLIANPORTUGUESE,
  BULGARIAN,
  CANADIANFRENCH,
  CATALAN,
  CHINESE,
  CZECH,
  DANISH,
  DUTCH,
  DUTCH2005REFORM,
  ENGLISH,
  FINNISH,
  GERMAN2006REFORM,
  GREEK,
  HUNGARIAN,
  ICELANDIC,
  ITALIAN,
  JAPANESE,
  NYNORSKNORWEGIAN,
  OLDGERMAN,
  POLISH,
  RUMANIAN,
  RUSSIAN,
  SERBIAN,
  SPANISH,
  STANDARDFRENCH,
  STANDARDGERMAN,
  STANDARDPORTUGUESE,
  SWEDISH,
  SWISSGERMAN,
  SWISSGERMAN2006REFORM,
  TURKISH,
  UKENGLISH,
  UKRANIAN
}

/**
 *
 *
 */
declare enum LayerOrderType {
  BOTTOMUP,
  TOPDOWN
}

/**
 * Illustrator library type
 *
 */
declare enum LibraryType {
  Brushes,
  GraphicStyles,
  IllustratorArtwork,
  Swatches,
  Symbols
}

/**
 * The type of compression to use on a monochrome bitmap item when
 * saving a PDF file
 *
 */
declare enum MonochromeCompression {
  CCIT3,
  CCIT4,
  MONOZIP,
  None,
  RUNLENGTH
}

/**
 * How transparency should be flattened when saving EPS and Illustrator
 * file formats with compatibility set to versions of Illustrator
 * earlier than Illustrator10
 *
 */
declare enum OutputFlattening {
  PRESERVEAPPEARANCE,
  PRESERVEPATHS
}

/**
 *
 *
 */
declare enum PDFBoxType {
  PDFARTBOX,
  PDFBLEEDBOX,
  PDFBOUNDINGBOX,
  PDFCROPBOX,
  PDFMEDIABOX,
  PDFTRIMBOX
}

/**
 *
 *
 */
declare enum PDFChangesAllowedEnum {
  CHANGE128ANYCHANGES,
  CHANGE128COMMENTING,
  CHANGE128EDITPAGE,
  CHANGE128FILLFORM,
  CHANGE128NONE,
  CHANGE40ANYCHANGES,
  CHANGE40COMMENTING,
  CHANGE40NONE,
  CHANGE40PAGELAYOUT
}

/**
 * The version of the Acrobat file format to create when saving a PDF
 * file
 *
 */
declare enum PDFCompatibility {
  ACROBAT4,
  ACROBAT5,
  ACROBAT6,
  ACROBAT7,
  ACROBAT8
}

/**
 *
 *
 */
declare enum PDFOverprint {
  DISCARDPDFOVERPRINT,
  PRESERVEPDFOVERPRINT
}

/**
 *
 *
 */
declare enum PDFPrintAllowedEnum {
  PRINT128HIGHRESOLUTION,
  PRINT128LOWRESOLUTION,
  PRINT128NONE,
  PRINT40HIGHRESOLUTION,
  PRINT40NONE
}

/**
 *
 *
 */
declare enum PDFTrimMarkWeight {
  TRIMMARKWEIGHT0125,
  TRIMMARKWEIGHT025,
  TRIMMARKWEIGHT05
}

/**
 *
 *
 */
declare enum PDFXStandard {
  PDFX1A2001,
  PDFX1A2003,
  PDFX32001,
  PDFX32003,
  PDFXNONE
}

/**
 *
 *
 */
declare enum PageMarksTypes {
  Japanese,
  Roman
}

/**
 * Which points, if any, of a path are selected
 *
 */
declare enum PathPointSelection {
  ANCHORPOINT,
  LEFTDIRECTION,
  LEFTRIGHTPOINT,
  NOSELECTION,
  RIGHTDIRECTION
}

/**
 *
 *
 */
declare enum PhotoshopCompatibility {
  PHOTOSHOP6,
  PHOTOSHOP8
}

/**
 * The type of path point selected
 *
 */
declare enum PointType {
  CORNER,
  SMOOTH
}

/**
 *
 *
 */
declare enum PolarityValues {
  NEGATIVE,
  POSITIVE
}

/**
 *
 *
 */
declare enum PostScriptImageCompressionType {
  IMAGECOMPRESSIONNONE,
  JPEG,
  RLE
}

/**
 *
 *
 */
declare enum PrintArtworkDesignation {
  ALLLAYERS,
  VISIBLELAYERS,
  VISIBLEPRINTABLELAYERS
}

/**
 *
 *
 */
declare enum PrintColorIntent {
  ABSOLUTECOLORIMETRIC,
  PERCEPTUALINTENT,
  RELATIVECOLORIMETRIC,
  SATURATIONINTENT
}

/**
 *
 *
 */
declare enum PrintColorProfile {
  CUSTOMPROFILE,
  OLDSTYLEPROFILE,
  PRINTERPROFILE,
  SOURCEPROFILE
}

/**
 *
 *
 */
declare enum PrintColorSeparationMode {
  COMPOSITE,
  HOSTBASEDSEPARATION,
  INRIPSEPARATION
}

/**
 *
 *
 */
declare enum PrintFontDownloadMode {
  DOWNLOADCOMPLETE,
  DOWNLOADNONE,
  DOWNLOADSUBSET
}

/**
 *
 *
 */
declare enum PrintOrientation {
  LANDSCAPE,
  PORTRAIT,
  REVERSELANDSCAPE,
  REVERSEPORTRAIT
}

/**
 *
 *
 */
declare enum PrintPosition {
  TRANSLATEBOTTOM,
  TRANSLATEBOTTOMLEFT,
  TRANSLATEBOTTOMRIGHT,
  TRANSLATECENTER,
  TRANSLATELEFT,
  TRANSLATERIGHT,
  TRANSLATETOP,
  TRANSLATETOPLEFT,
  TRANSLATETOPRIGHT
}

/**
 *
 *
 */
declare enum PrintTiling {
  TILEFULLPAGES,
  TILEIMAGEABLEAREAS,
  TILESINGLEFULLPAGE
}

/**
 *
 *
 */
declare enum PrinterColorMode {
  BLACKANDWHITEPRINTER,
  COLORPRINTER,
  GRAYSCALEPRINTER
}

/**
 *
 *
 */
declare enum PrinterPostScriptLevelEnum {
  PSLEVEL1,
  PSLEVEL2,
  PSLEVEL3
}

/**
 *
 *
 */
declare enum PrinterTypeEnum {
  NONPOSTSCRIPTPRINTER,
  POSTSCRIPTPRINTER,
  Unknown
}

/**
 *
 *
 */
declare enum PrintingBounds {
  ARTBOARDBOUNDS,
  ARTWORKBOUNDS,
  CROPBOUNDS
}

/**
 * The status of a raster item’s linked image if the image is stored
 * externally
 *
 */
declare enum RasterLinkState {
  DATAFROMFILE,
  DATAMODIFIED,
  NODATA
}

/**
 * The default measurement units for the rulers of a document
 *
 */
declare enum RulerUnits {
  Centimeters,
  Inches,
  Millimeters,
  Picas,
  Pixels,
  Points,
  Qs,
  Unknown
}

/**
 * How should the CSS properties of the document be included in an
 * exported SVG file
 *
 */
declare enum SVGCSSPropertyLocation {
  ENTITIES,
  PRESENTATIONATTRIBUTES,
  STYLEATTRIBUTES,
  STYLEELEMENTS
}

/**
 * SVB version compatibility for exported files
 *
 */
declare enum SVGDTDVersion {
  SVG1_0,
  SVG1_1,
  SVGBASIC1_1,
  SVGTINY1_1,
  SVGTINY1_1PLUS,
  SVGTINY1_2
}

/**
 * How should the text in the document be encoded when exporting an SVG
 * file
 *
 */
declare enum SVGDocumentEncoding {
  ASCII,
  UTF16,
  UTF8
}

/**
 * What font glyphs should be included in exported SVG files
 *
 */
declare enum SVGFontSubsetting {
  ALLGLYPHS,
  COMMONENGLISH,
  COMMONROMAN,
  GLYPHSUSED,
  GLYPHSUSEDPLUSENGLISH,
  GLYPHSUSEDPLUSROMAN,
  None
}

/**
 * Types for fonts included in exported SVG files
 *
 */
declare enum SVGFontType {
  CEFFONT,
  OUTLINEFONT,
  SVGFONT
}

/**
 * Save options provided when closing a document
 *
 */
declare enum SaveOptions {
  DONOTSAVECHANGES,
  PROMPTTOSAVECHANGES,
  SAVECHANGES
}

/**
 * The mode of display for a view
 *
 */
declare enum ScreenMode {
  DESKTOP,
  FULLSCREEN,
  MULTIWINDOW
}

/**
 * The type of line capping for a path stroke
 *
 */
declare enum StrokeCap {
  BUTTENDCAP,
  PROJECTINGENDCAP,
  ROUNDENDCAP
}

/**
 * The type of joints for a path stroke
 *
 */
declare enum StrokeJoin {
  BEVELENDJOIN,
  MITERENDJOIN,
  ROUNDENDJOIN
}

/**
 *
 *
 */
declare enum StyleRunAlignmentType {
  ROMANBASELINE,
  bottom,
  center,
  icfBottom,
  icfTop,
  top
}

/**
 * The alignment of a tab stop
 *
 */
declare enum TabStopAlignment {
  Center,
  Decimal,
  Left,
  Right
}

/**
 * The orientation of text in a text art item
 *
 */
declare enum TextOrientation {
  HORIZONTAL,
  VERTICAL
}

/**
 * The type of text art displayed by this object
 *
 */
declare enum TextType {
  AREATEXT,
  PATHTEXT,
  POINTTEXT
}

/**
 *
 *
 */
declare enum TracingModeType {
  TRACINGMODEBLACKANDWHITE,
  TRACINGMODECOLOR,
  TRACINGMODEGRAY
}

/**
 * The point to use as the anchor point about which an object is
 * rotated, resized, or transformed
 *
 */
declare enum Transformation {
  BOTTOM,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER,
  DOCUMENTORIGIN,
  LEFT,
  RIGHT,
  TOP,
  TOPLEFT,
  TOPRIGHT
}

/**
 *
 *
 */
declare enum TrappingType {
  IGNOREOPAQUE,
  NORMALTRAPPING,
  OPAQUE,
  TRANSPARENT
}

/**
 * User interface settings
 *
 */
declare enum UserInteractionLevel {
  DISPLAYALERTS,
  DONTDISPLAYALERTS
}

/**
 * What type of variables are included in the document
 *
 */
declare enum VariableKind {
  GRAPH,
  IMAGE,
  TEXTUAL,
  Unknown,
  VISIBILITY
}

/**
 * The raster visualization mode for tracing.
 *
 */
declare enum ViewRasterType {
  TRACINGVIEWRASTERADJUSTEDIMAGE,
  TRACINGVIEWRASTERNOIMAGE,
  TRACINGVIEWRASTERORIGINALIMAGE,
  TRACINGVIEWRASTERTRANSPARENTIMAGE
}

/**
 * The vector visualization mode for tracing.
 *
 */
declare enum ViewVectorType {
  TRACINGVIEWVECTORNOTRACINGRESULT,
  TRACINGVIEWVECTOROUTLINES,
  TRACINGVIEWVECTOROUTLINESWITHTRACING,
  TRACINGVIEWVECTORTRACINGRESULT
}

/**
 *
 *
 */
declare enum WariChuJustificationType {
  Center,
  Left,
  Right,
  WARICHUAUTOJUSTIFY,
  WARICHUFULLJUSTIFY,
  WARICHUFULLJUSTIFYLASTLINECENTER,
  WARICHUFULLJUSTIFYLASTLINELEFT,
  WARICHUFULLJUSTIFYLASTLINERIGHT
}

/**
 * The method used to arrange an art item’s position in the stacking
 * order of its parent group or layer, as specified with the zOrder
 * method
 *
 */
declare enum ZOrderMethod {
  BRINGFORWARD,
  BRINGTOFRONT,
  SENDBACKWARD,
  SENDTOBACK
}

interface ExportOptions extends Props<{}>{}

interface Gradients extends Props<Document>{}

interface Gradient{}

interface GraphItems extends Props<{}>{}

interface GroupItems extends Props<{}>{}

interface ImageCaptureOptions extends Props<{}>{}

interface LegacyTextItems extends Props<{}>{}

interface Matrix {}

interface MeshItems extends Props<{}>{}

interface PageItems extends Props<{}>{}

interface ParagraphStyles extends Props<{}>{}

interface PathItem {
  /**
   * The path points contained in this path item.
   *
   * @readonly
   */
  pathPoints: PathPoints;

  /**
   * The polarity of the path.
   */
  polarity: PolarityValues;

  /**
   * The position (in points) of the top left corner of the pathItem object
   * in the format [x, y]. Does not include stroke weight.
   */
  position: number[];
}

interface PathItems extends Collection<PathItem> {}

interface Patterns extends Props<{}>{}

interface Pattern{}

interface PluginItems extends Props<{}>{}

interface PrintOptions extends Props<{}>{}

interface RasterItems extends Props<{}>{}

interface Spots extends Props<{}>{}

interface Spot{}

interface Stories extends Props<{}>{}

interface Swatches extends Props<{}>{}

interface Symbols extends Props<{}>{}

interface SymbolItems extends Props<{}>{}

interface Tags extends Props<Application> { // @fixme check
}

interface TextFrames extends Props<{}>{}

interface Variables extends Props<{}>{}

interface View {
  /**
   * The bounding rectangle of this view relative to the current document’s bounds.
   *
   * @readonly
   */
  bounds: number[];

  /**
   * The center point of this view relative to the current document’s bounds.
   */
  centerPoint: number[];

  /**
   * The document that contains this view.
   *
   * @readonly
   */
  parent: Document;

  /**
   * The mode of display for this view.
   */
  screenMode: ScreenMode;

  /**
   * The class name of the referenced object.
   * @readonly
   */
  typename: string;

  /**
   * The zoom factor of this view, where 100.0 is 100%.
   */
  zoom: number;
}

interface Views extends Props<Application> { // @fixme check
  /**
   * Gets an element from the collection.
   *
   * @param {number} index
   * @returns {View}
   */
  [index: number]: View;
}
