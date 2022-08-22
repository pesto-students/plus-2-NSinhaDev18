# Week-1-Q1-working_of_browser
Explains the working of browser.

Web browsers are primarily used to display and access websites on the internet, as well as other content created with programming languages such as Hypertext Markup Language (HTML) and Extensible Markup Language (XML) (XML). Browsers convert Hypertext Transfer Protocol (HTTP) web pages and websites into human-readable content. They can also show other protocols and prefixes, such as secure HTTP (HTTPS), FTPs, etc.
A web browser’s primary function is to render HTML, the code that is used to design web pages. When a browser loads a web page, it processes the HTML, which may contain text, links, and references to images and other items like CSS and JavaScript functions. The browser then renders these objects in the browser window after processing them.
# Browser's high level structure:
The browser's main components are:
1.	The user interface: this includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.
2.	The browser engine: marshals actions between the UI and the rendering engine.
3.	The rendering engine : responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
4.	Networking: for network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.
5.	UI backend: used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
6.	JavaScript interpreter. Used to parse and execute JavaScript code.
7.	Data storage. This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.
![image](https://user-images.githubusercontent.com/84844643/168432209-059a752e-1213-4074-be7e-52d0a6b0c562.png)
## The rendering engine
The responsibility of the rendering engine to display the requested contents on the browser screen.
By default the rendering engine can display HTML and XML documents and images. It can display other types of data via plug-ins or extension; for example, displaying PDF documents using a PDF viewer plug-in. 
### The main flow
The rendering engine will start getting the contents of the requested document from the networking layer. This will usually be done in 8kB chunks.
After that, this is the basic flow of the rendering engine:
![image](https://user-images.githubusercontent.com/84844643/168432586-00c714e8-6dc6-4ee5-a4b4-52c88cbcdbf4.png)

The rendering engine will start parsing the HTML document and convert elements to DOM nodes in a tree called the "content tree". The engine will parse the style data, both in external CSS files and in style elements. Styling information together with visual instructions in the HTML will be used to create another tree: the render tree.
The render tree contains rectangles with visual attributes like color and dimensions. The rectangles are in the right order to be displayed on the screen.
After the construction of the render tree it goes through a "layout" process. This means giving each node the exact coordinates where it should appear on the screen. The next stage is painting–the render tree will be traversed and each node will be painted using the UI backend layer.
It's important to understand that this is a gradual process. For better user experience, the rendering engine will try to display contents on the screen as soon as possible. It will not wait until all HTML is parsed before starting to build and layout the render tree. Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming from the network.

![image](https://user-images.githubusercontent.com/84844643/168432743-ffb9c418-4417-4523-befe-0923d7ca6a1a.png)

## HTML Parser
The job of the HTML parser is to parse the HTML markup into a parse tree.
### Overview of the parsing model:
The input to the HTML parsing process consists of a stream of code points, which is passed through a tokenization stage followed by a tree construction stage. The output is a Document object.
In the common case, the data handled by the tokenization stage comes from the network, but it can also come from script running in the user agent, e.g. using the document.write() API.
There is only one set of states for the tokenizer stage and the tree construction stage, but the tree construction stage is reentrant, meaning that while the tree construction stage is handling one token, the tokenizer might be resumed, causing further tokens to be emitted and processed before the first token's processing is complete.
### DOM
The output tree (the "parse tree") is a tree of DOM element and attribute nodes. DOM is short for Document Object Model. It is the object presentation of the HTML document and the interface of HTML elements to the outside world like JavaScript.
The root of the tree is the "Document" object.
The DOM has an almost one-to-one relation to the markup. For example:
![image](https://user-images.githubusercontent.com/84844643/168434284-8d79a0ad-5758-455d-9759-db4f63a0282a.png)

This markup would be translated to the following DOM tree:
![image](https://user-images.githubusercontent.com/84844643/168434432-63d2180d-2e21-466d-b7b6-9dad22286f68.png)

### The parsing algorithm
Browsers create custom parsers for parsing HTML.
The algorithm consists of two stages: 
1. tokenization and 
2. tree construction.
3. 
Tokenization is the lexical analysis, parsing the input into tokens. Among HTML tokens are start tags, end tags, attribute names and attribute values.
The tokenizer recognizes the token, gives it to the tree constructor, and consumes the next character for recognizing the next token, and so on until the end of the input.
![image](https://user-images.githubusercontent.com/84844643/168434910-8cc700ea-4e6a-4bcc-9667-59feb7ae425c.png)

#### The tokenization algorithm
The algorithm's output is an HTML token. The algorithm is expressed as a state machine. Each state consumes one or more characters of the input stream and updates the next state according to those characters. The decision is influenced by the current tokenization state and by the tree construction state. This means the same consumed character will yield different results for the correct next state, depending on the current state. The algorithm is too complex to describe fully, so let's see a simple example that will help us understand the principle.
Basic example–tokenizing the following HTML:
![image](https://user-images.githubusercontent.com/84844643/168435451-42d84658-eb97-4103-855a-ac053205626d.png)

The initial state is the "Data state". When the < character is encountered, the state is changed to "Tag open state". Consuming an a-z character causes creation of a "Start tag token", the state is changed to "Tag name state". We stay in this state until the > character is consumed. Each character is appended to the new token name. In our case the created token is an html token.
When the > tag is reached, the current token is emitted and the state changes back to the "Data state". The <body> tag will be treated by the same steps. So far the html and body tags were emitted. We are now back at the "Data state". Consuming the H character of Hello world will cause creation and emitting of a character token, this goes on until the < of </body> is reached. We will emit a character token for each character of Hello world.
We are now back at the "Tag open state". Consuming the next input / will cause creation of an end tag token and a move to the "Tag name state". Again we stay in this state until we reach >.Then the new tag token will be emitted and we go back to the "Data state". The </html> input will be treated like the previous case.
![image](https://user-images.githubusercontent.com/84844643/168435670-3e33180f-af6f-4d02-acc3-52c974cb3fe1.png)

#### Tree construction algorithm
When the parser is created the Document object is created. During the tree construction stage the DOM tree with the Document in its root will be modified and elements will be added to it. Each node emitted by the tokenizer will be processed by the tree constructor. For each token the specification defines which DOM element is relevant to it and will be created for this token. The element is added to the DOM tree, and also the stack of open elements. This stack is used to correct nesting mismatches and unclosed tags. The algorithm is also described as a state machine. The states are called "insertion modes".
Let's see the tree construction process for the example input:
![image](https://user-images.githubusercontent.com/84844643/168436009-60ee24e7-89d3-4400-96ee-e124c81ea12e.png)

The input to the tree construction stage is a sequence of tokens from the tokenization stage. The first mode is the "initial mode". Receiving the "html" token will cause a move to the "before html" mode and a reprocessing of the token in that mode. This will cause creation of the HTMLHtmlElement element, which will be appended to the root Document object.
The state will be changed to "before head". The "body" token is then received. An HTMLHeadElement will be created implicitly although we don't have a "head" token and it will be added to the tree.
We now move to the "in head" mode and then to "after head". The body token is reprocessed, an HTMLBodyElement is created and inserted and the mode is transferred to "in body".
The character tokens of the "Hello world" string are now received. The first one will cause creation and insertion of a "Text" node and the other characters will be appended to that node.
The receiving of the body end token will cause a transfer to "after body" mode. We will now receive the html end tag which will move us to "after after body" mode. Receiving the end of file token will end the parsing.
![image](https://user-images.githubusercontent.com/84844643/168436229-c6b25a5e-d021-444c-9e0e-4ec6ee900298.png)

#### Actions when the parsing is finished
At this stage the browser will mark the document as interactive and start parsing scripts that are in "deferred" mode: those that should be executed after the document is parsed. The document state will be then set to "complete" and a "load" event will be fired.

#### CSS parsing
Unlike HTML, CSS is a context free grammar.
Each CSS file is parsed into a Stylesheet object. Each object contains CSS rules. The CSS rule objects contain selector and declaration objects and other objects corresponding to CSS grammar.
![image](https://user-images.githubusercontent.com/84844643/168437158-d739f6f1-b777-46c3-89f0-23f9ef6c6ef1.png)

#### The order of processing scripts and style sheets
##### Scripts
The model of the web is synchronous. Scripts to be parsed and executed immediately when the parser reaches a <script> tag. The parsing of the document halts until the script has been executed. If the script is external then the resource must first be fetched from the network–this is also done synchronously, and parsing halts until the resource is fetched. 
This was the model for many years and is also specified in HTML4 and 5 specifications. 
The "defer" attribute can be added to a script, in which case it will not halt document parsing and will execute after the document is parsed. 
HTML5 adds an option to mark the script as asynchronous so it will be parsed and executed by a different thread.

##### Speculative parsing
Both WebKit and Firefox do this optimization. While executing scripts, another thread parses the rest of the document and finds out what other resources need to be loaded from the network and loads them. In this way, resources can be loaded on parallel connections and overall speed is improved. 
Note: the speculative parser only parses references to external resources like external scripts, style sheets and images: it doesn't modify the DOM tree–that is left to the main parser.

##### Style sheets
Style sheets on the other hand have a different model. Conceptually it seems that since style sheets don't change the DOM tree, there is no reason to wait for them and stop the document parsing. There is an issue, though, of scripts asking for style information during the document parsing stage. If the style is not loaded and parsed yet, the script will get wrong answers and apparently this caused lots of problems. It seems to be an edge case but is quite common. Firefox blocks all scripts when there is a style sheet that is still being loaded and parsed. 
WebKit blocks scripts only when they try to access certain style properties that may be affected by unloaded style sheets.

#### Render tree construction
While the DOM tree is being constructed, the browser constructs another tree, the render tree. This tree is of visual elements in the order in which they will be displayed. It is the visual representation of the document. The purpose of this tree is to enable painting the contents in their correct order.
Firefox calls the elements in the render tree "frames". WebKit uses the term renderer or render object.
A renderer knows how to lay out and paint itself and its children.
WebKit's RenderObject class, the base class of the renderers, has the following definition:
  
![image](https://user-images.githubusercontent.com/84844643/168438785-461a9a9d-51ec-4eaa-8519-1738a78c204d.png)

Each renderer represents a rectangular area usually corresponding to a node's CSS box, as described by the CSS2 spec. It includes geometric information like width, height and position.
The box type is affected by the "display" value of the style attribute that is relevant to the node. Here is WebKit code for deciding what type of renderer should be created for a DOM node, according to the display attribute:
  
![image](https://user-images.githubusercontent.com/84844643/168438923-78b1fb8c-147a-4a39-b0b3-2f1e5e49a7a9.png)

The element type is also considered: for example, form controls and tables have special frames.
In WebKit if an element wants to create a special renderer, it will override the createRenderer() method. The renderers point to style objects that contains non geometric information.

#### The render tree relation to the DOM tree
The renderers correspond to DOM elements, but the relation is not one to one. Non-visual DOM elements will not be inserted in the render tree. An example is the "head" element. Also elements whose display value was assigned to "none" will not appear in the tree (whereas elements with "hidden" visibility will appear in the tree).
There are DOM elements which correspond to several visual objects. These are usually elements with complex structure that cannot be described by a single rectangle. For example, the "select" element has three renderers: one for the display area, one for the drop down list box and one for the button. Also when text is broken into multiple lines because the width is not sufficient for one line, the new lines will be added as extra renderers.
Another example of multiple renderers is broken HTML. According to the CSS spec an inline element must contain either only block elements or only inline elements. In the case of mixed content, anonymous block renderers will be created to wrap the inline elements.
Some render objects correspond to a DOM node but not in the same place in the tree. Floats and absolutely positioned elements are out of flow, placed in a different part of the tree, and mapped to the real frame. A placeholder frame is where they should have been.
  
![image](https://user-images.githubusercontent.com/84844643/168438992-abf0517f-98ca-45aa-ad77-3d9f2522faa0.png)

#### The flow of constructing the tree
In Firefox, the presentation is registered as a listener for DOM updates. The presentation delegates frame creation to the FrameConstructor and the constructor resolves style and creates a frame.
In WebKit the process of resolving the style and creating a renderer is called "attachment". Every DOM node has an "attach" method. Attachment is synchronous, node insertion to the DOM tree calls the new node "attach" method.
Processing the html and body tags results in the construction of the render tree root. The root render object corresponds to what the CSS spec calls the containing block: the top most block that contains all other blocks. Its dimensions are the viewport: the browser window display area dimensions. Firefox calls it ViewPortFrame and WebKit calls it RenderView. This is the render object that the document points to. The rest of the tree is constructed as a DOM nodes insertion.

#### Style Computation
Building the render tree requires calculating the visual properties of each render object. This is done by calculating the style properties of each element.
The style includes style sheets of various origins, inline style elements and visual properties in the HTML (like the "bgcolor" property).The later is translated to matching CSS style properties.
The origins of style sheets are the browser's default style sheets, the style sheets provided by the page author and user style sheets–these are style sheets provided by the browser user (browsers let you define your favorite styles. In Firefox, for instance, this is done by placing a style sheet in the "Firefox Profile" folder).
Style computation brings up a few difficulties:
1.	Style data is a very large construct, holding the numerous style properties, this can cause memory problems.
2.	Finding the matching rules for each element can cause performance issues if it's not optimized. Traversing the entire rule list for each element to find matches is a heavy task. Selectors can have complex structure that can cause the matching process to start on a seemingly promising path that is proven to be futile and another path has to be tried.
For example–this compound selector:
  
![image](https://user-images.githubusercontent.com/84844643/168439215-4d8305c5-2fad-44f0-b5c5-8109dbd0c974.png)

Means the rules apply to a <div> who is the descendant of 3 divs. Suppose you want to check if the rule applies for a given <div> element. You choose a certain path up the tree for checking. You may need to traverse the node tree up just to find out there are only two divs and the rule does not apply. You then need to try other paths in the tree.
  
3.	Applying the rules involves quite complex cascade rules that define the hierarchy of the rules.
Let's see how the browsers face these issues:
  
#### Sharing style data
WebKit nodes references style objects (RenderStyle). These objects can be shared by nodes in some conditions. The nodes are siblings or cousins and:
1.	The elements must be in the same mouse state (e.g., one can't be in :hover while the other isn't)
2.	Neither element should have an id
3.	The tag names should match
4.	The class attributes should match
5.	The set of mapped attributes must be identical
6.	The link states must match
7.	The focus states must match
8.	Neither element should be affected by attribute selectors, where affected is defined as having any selector match that uses an attribute selector in any position within the selector at all
9.	There must be no inline style attribute on the elements
10.	There must be no sibling selectors in use at all. WebCore simply throws a global switch when any sibling selector is encountered and disables style sharing for the entire document when they are present. This includes the + selector and selectors like :first-child and :last-child.

#### Firefox rule tree
Firefox has two extra trees for easier style computation: the rule tree and style context tree. WebKit also has style objects but they are not stored in a tree like the style context tree, only the DOM node points to its relevant style.
![image](https://user-images.githubusercontent.com/84844643/168439384-25c72d17-8a36-4e15-9fd7-efd19d31462c.png)

The style contexts contain end values. The values are computed by applying all the matching rules in the correct order and performing manipulations that transform them from logical to concrete values. For example, if the logical value is a percentage of the screen it will be calculated and transformed to absolute units. The rule tree idea is really clever. It enables sharing these values between nodes to avoid computing them again. This also saves space.

All the matched rules are stored in a tree. The bottom nodes in a path have higher priority. The tree contains all the paths for rule matches that were found. Storing the rules is done lazily. The tree isn't calculated at the beginning for every node, but whenever a node style needs to be computed the computed paths are added to the tree.

The idea is to see the tree paths as words in a lexicon. Lets say we already computed this rule tree:
  ![image](https://user-images.githubusercontent.com/84844643/168439402-a0d3d81d-8abc-4b86-a90e-c5208d9d91c7.png)

Suppose we need to match rules for another element in the content tree, and find out the matched rules (in the correct order) are B-E-I. We already have this path in the tree because we already computed path A-B-E-I-L. We will now have less work to do.
Let's see how the tree saves us work.

##### Division into structs
The style contexts are divided into structs. Those structs contain style information for a certain category like border or color. All the properties in a struct are either inherited or non inherited. Inherited properties are properties that unless defined by the element, are inherited from its parent. Non inherited properties (called "reset" properties) use default values if not defined.

The tree helps us by caching entire structs (containing the computed end values) in the tree. The idea is that if the bottom node didn't supply a definition for a struct, a cached struct in an upper node can be used.

##### Computing the style contexts using the rule tree
When computing the style context for a certain element, we first compute a path in the rule tree or use an existing one. We then begin to apply the rules in the path to fill the structs in our new style context. We start at the bottom node of the path–the one with the highest precedence (usually the most specific selector) and traverse the tree up until our struct is full. If there is no specification for the struct in that rule node, then we can greatly optimize–we go up the tree until we find a node that specifies it fully and simply point to it–that's the best optimization–the entire struct is shared. This saves computation of end values and memory.
If we find partial definitions we go up the tree until the struct is filled.

If we didn't find any definitions for our struct then, in case the struct is an "inherited" type, we point to the struct of our parent in the context tree. In this case we also succeeded in sharing structs. If it's a reset struct then default values will be used.

If the most specific node does add values then we need to do some extra calculations for transforming it to actual values. We then cache the result in the tree node so it can be used by children.

In case an element has a sibling or a brother that points to the same tree node then the entire style context can be shared between them.

Lets see an example: Suppose we have this HTML
  
![image](https://user-images.githubusercontent.com/84844643/168439462-7c48c70f-a1f3-4e8f-850d-7d6b03dbdffe.png)
And the following rules:
  
  ![image](https://user-images.githubusercontent.com/84844643/168439481-d98fa9e4-1e65-4ebc-a1be-251beb0e910d.png)

  To simplify things let's say we need to fill out only two structs: the color struct and the margin struct. The color struct contains only one member: the color The margin struct contains the four sides.
The resulting rule tree will look like this (the nodes are marked with the node name: the number of the rule they point at):
  
![image](https://user-images.githubusercontent.com/84844643/168439508-b46e472e-2599-4d60-b50e-3e4eb9e0f1ff.png)

  The context tree will look like this (node name: rule node they point to):
  
  ![image](https://user-images.githubusercontent.com/84844643/168439526-48602bfb-2a21-4ca1-84fd-90dd28c47beb.png)

Suppose we parse the HTML and get to the second <div> tag. We need to create a style context for this node and fill its style structs.
We will match the rules and discover that the matching rules for the <div> are 1, 2 and 6. This means there is already an existing path in the tree that our element can use and we just need to add another node to it for rule 6 (node F in the rule tree).
We will create a style context and put it in the context tree. The new style context will point to node F in the rule tree.

We now need to fill the style structs. We will begin by filling out the margin struct. Since the last rule node (F) doesn't add to the margin struct, we can go up the tree until we find a cached struct computed in a previous node insertion and use it. We will find it on node B, which is the uppermost node that specified margin rules.

We do have a definition for the color struct, so we can't use a cached struct. Since color has one attribute we don't need to go up the tree to fill other attributes. We will compute the end value (convert string to RGB etc) and cache the computed struct on this node.

The work on the second <span> element is even easier. We will match the rules and come to the conclusion that it points to rule G, like the previous span. Since we have siblings that point to the same node, we can share the entire style context and just point to the context of the previous span.

For structs that contain rules that are inherited from the parent, caching is done on the context tree (the color property is actually inherited, but Firefox treats it as reset and caches it on the rule tree).
For instance if we added rules for fonts in a paragraph:
  
  ![image](https://user-images.githubusercontent.com/84844643/168439563-3475ad04-1781-4068-8770-977f33a13872.png)

  Then the paragraph element, which is a child of the div in the context tree, could have shared the same font struct as his parent. This is if no font rules were specified for the paragraph.
In WebKit, who does not have a rule tree, the matched declarations are traversed four times. First non-important high priority properties are applied (properties that should be applied first because others depend on them, such as display), then high priority important, then normal priority non-important, then normal priority important rules. This means that properties that appear multiple times will be resolved according to the correct cascade order.
  
##### Manipulating the rules for an easy match
There are several sources for style rules:
![image](https://user-images.githubusercontent.com/84844643/168439758-1467a690-bbec-432e-b1c3-772b0cb126f6.png)

  The last two are easily matched to the element since he owns the style attributes and HTML attributes can be mapped using the element as the key.
After parsing the style sheet, the rules are added to one of several hash maps, according to the selector. There are maps by id, by class name, by tag name and a general map for anything that doesn't fit into those categories. If the selector is an id, the rule will be added to the id map, if it's a class it will be added to the class map etc.
This manipulation makes it much easier to match rules. There is no need to look in every declaration: we can extract the relevant rules for an element from the maps. This optimization eliminates 95+% of the rules, so that they need not even be considered during the matching process.

#### Applying the rules in the correct cascade order
The style object has properties corresponding to every visual attribute (all CSS attributes but more generic). If the property is not defined by any of the matched rules, then some properties can be inherited by the parent element style object. Other properties have default values.

The problem begins when there is more than one definition–here comes the cascade order to solve the issue.

#### Style sheet cascade order
A declaration for a style property can appear in several style sheets, and several times inside a style sheet. This means the order of applying the rules is very important. This is called the "cascade" order. According to CSS2 spec, the cascade order is (from low to high):
1. Browser declarations
2. User normal declarations
3. Author normal declarations
4. Author important declarations
5. User important declarations
  
The browser declarations are least important and the user overrides the author only if the declaration was marked as important. Declarations with the same order will be sorted by specificity and then the order they are specified. The HTML visual attributes are translated to matching CSS declarations . They are treated as author rules with low priority.
 
#### Specificity
The selector specificity is defined by the CSS2 specification as follows:
•	count 1 if the declaration it is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (= a)
•	count the number of ID attributes in the selector (= b)
•	count the number of other attributes and pseudo-classes in the selector (= c)
•	count the number of element names and pseudo-elements in the selector (= d)
Concatenating the four numbers a-b-c-d (in a number system with a large base) gives the specificity.
The number base you need to use is defined by the highest count you have in one of the categories.
For example, if a=14 you can use hexadecimal base. In the unlikely case where a=17 you will need a 17 digits number base. The later situation can happen with a selector like this: html body div div p ... (17 tags in your selector.. not very likely).
Some examples:
  
![image](https://user-images.githubusercontent.com/84844643/168439961-8cd1c942-bc52-4196-801b-04371060a59f.png)

##### Sorting the rules
After the rules are matched, they are sorted according to the cascade rules. WebKit uses bubble sort for small lists and merge sort for big ones. WebKit implements sorting by overriding the ">" operator for the rules:
  ![image](https://user-images.githubusercontent.com/84844643/168439982-aeca6991-c46f-4d9b-9856-04db3f4c1ee2.png)

##### Gradual process
WebKit uses a flag that marks if all top level style sheets (including @imports) have been loaded. If the style is not fully loaded when attaching, place holders are used and it is marked in the document, and they will be recalculated once the style sheets were loaded.

### Layout
When the renderer is created and added to the tree, it does not have a position and size. Calculating these values is called layout or reflow.
HTML uses a flow based layout model, meaning that most of the time it is possible to compute the geometry in a single pass. Elements later ``in the flow'' typically do not affect the geometry of elements that are earlier ``in the flow'', so layout can proceed left-to-right, top-to-bottom through the document. There are exceptions: for example, HTML tables may require more than one pass (3.5).
The coordinate system is relative to the root frame. Top and left coordinates are used.
Layout is a recursive process. It begins at the root renderer, which corresponds to the <html> element of the HTML document. Layout continues recursively through some or all of the frame hierarchy, computing geometric information for each renderer that requires it.
The position of the root renderer is 0,0 and its dimensions are the viewport–the visible part of the browser window.
All renderers have a "layout" or "reflow" method, each renderer invokes the layout method of its children that need layout.

  #### Dirty bit system
In order not to do a full layout for every small change, browsers use a "dirty bit" system. A renderer that is changed or added marks itself and its children as "dirty": needing layout.
There are two flags: "dirty", and "children are dirty" which means that although the renderer itself may be OK, it has at least one child that needs a layout.

  #### Global and incremental layout
Layout can be triggered on the entire render tree–this is "global" layout. This can happen as a result of:
1.	A global style change that affects all renderers, like a font size change.
2.	As a result of a screen being resized
Layout can be incremental, only the dirty renderers will be laid out (this can cause some damage which will require extra layouts).
Incremental layout is triggered (asynchronously) when renderers are dirty. For example when new renderers are appended to the render tree after extra content came from the network and was added to the DOM tree.
![image](https://user-images.githubusercontent.com/84844643/168440116-66b1059d-e33f-4ce7-8eaf-83b52081a01d.png)

##### Asynchronous and Synchronous layout
Incremental layout is done asynchronously. Firefox queues "reflow commands" for incremental layouts and a scheduler triggers batch execution of these commands. WebKit also has a timer that executes an incremental layout–the tree is traversed and "dirty" renderers are layout out.
Scripts asking for style information, like "offsetHeight" can trigger incremental layout synchronously.
Global layout will usually be triggered synchronously.
Sometimes layout is triggered as a callback after an initial layout because some attributes, like the scrolling position changed.

  ##### Optimizations
When a layout is triggered by a "resize" or a change in the renderer position(and not size), the renders sizes are taken from a cache and not recalculated..
In some cases only a sub tree is modified and layout does not start from the root. This can happen in cases where the change is local and does not affect its surroundings–like text inserted into text fields (otherwise every keystroke would trigger a layout starting from the root).

  ##### The layout process
The layout usually has the following pattern:
1.	Parent renderer determines its own width.
2.	Parent goes over children and:
0.	Place the child renderer (sets its x and y).
1.	Calls child layout if needed–they are dirty or we are in a global layout, or for some other reason–which calculates the child's height.
3.	Parent uses children's accumulative heights and the heights of margins and padding to set its own height–this will be used by the parent renderer's parent.
4.	Sets its dirty bit to false.
Firefox uses a "state" object(nsHTMLReflowState) as a parameter to layout (termed "reflow"). Among others the state includes the parents width.
The output of the Firefox layout is a "metrics" object(nsHTMLReflowMetrics). It will contain the renderer computed height.

  #### Width calculation
The renderer's width is calculated using the container block's width, the renderer's style "width" property, the margins and borders.
For example the width of the following div:
  
![image](https://user-images.githubusercontent.com/84844643/168440187-4460f67d-adb6-426b-b515-ee7a6f9b5ad5.png)

  Would be calculated by WebKit as the following(class RenderBox method calcWidth):
•	The container width is the maximum of the containers availableWidth and 0. The availableWidth in this case is the contentWidth which is calculated as:
  
![image](https://user-images.githubusercontent.com/84844643/168440260-53c51e1c-b965-42b9-a3c5-9344baec40cd.png)

  clientWidth and clientHeight represent the interior of an object excluding border and scrollbar.
•	The elements width is the "width" style attribute. It will be calculated as an absolute value by computing the percentage of the container width.
•	The horizontal borders and paddings are now added.
So far this was the calculation of the "preferred width". Now the minimum and maximum widths will be calculated.
If the preferred width is greater then the maximum width, the maximum width is used. If it is less then the minimum width (the smallest unbreakable unit) then the minimum width is used.
The values are cached in case a layout is needed, but the width does not change.

#### Painting
In the painting stage, the render tree is traversed and the renderer's "paint()" method is called to display content on the screen. Painting uses the UI infrastructure component.
##### Global and Incremental
Like layout, painting can also be global–the entire tree is painted–or incremental. In incremental painting, some of the renderers change in a way that does not affect the entire tree. The changed renderer invalidates its rectangle on the screen. This causes the OS to see it as a "dirty region" and generate a "paint" event. The OS does it cleverly and coalesces several regions into one. In Chrome it is more complicated because the renderer is in a different process then the main process. Chrome simulates the OS behavior to some extent. The presentation listens to these events and delegates the message to the render root. The tree is traversed until the relevant renderer is reached. It will repaint itself (and usually its children).

#### The painting order
CSS2 defines the order of the painting process. This is actually the order in which the elements are stacked in the stacking contexts. This order affects painting since the stacks are painted from back to front. The stacking order of a block renderer is:
1.	background color
2.	background image
3.	border
4.	children
5.	outline

  ##### Firefox display list
Firefox goes over the render tree and builds a display list for the painted rectangular. It contains the renderers relevant for the rectangular, in the right painting order (backgrounds of the renderers, then borders etc). That way the tree needs to be traversed only once for a repaint instead of several times–painting all backgrounds, then all images, then all borders etc.
Firefox optimizes the process by not adding elements that will be hidden, like elements completely beneath other opaque elements.
WebKit rectangle storage
Before repainting, WebKit saves the old rectangle as a bitmap. It then paints only the delta between the new and old rectangles.

##### Dynamic changes
The browsers try to do the minimal possible actions in response to a change. So changes to an element's color will cause only repaint of the element. Changes to the element position will cause layout and repaint of the element, its children and possibly siblings. Adding a DOM node will cause layout and repaint of the node. Major changes, like increasing font size of the "html" element, will cause invalidation of caches, relayout and repaint of the entire tree.

 ##### The rendering engine's threads
The rendering engine is single threaded. Almost everything, except network operations, happens in a single thread. In Firefox and Safari this is the main thread of the browser. In Chrome it's the tab process main thread.
Network operations can be performed by several parallel threads. The number of parallel connections is limited (usually 2–6 connections).

 ##### Event loop
The browser main thread is an event loop. It's an infinite loop that keeps the process alive. It waits for events (like layout and paint events) and processes them. This is Firefox code for the main event loop:
  
![image](https://user-images.githubusercontent.com/84844643/168440373-04752da7-9afc-4099-b142-7065f98ccf65.png)

  