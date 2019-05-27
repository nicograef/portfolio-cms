# Portfolio CMS

A dead simple cms for web portfolios. Made with only vanilla javascript, Bootstrap and Google Firebase (or any other NoSQL database).

<img src="img/portfolio-cms-01.jpg" width="50%"><img src="img/portfolio-cms-02.jpg" width="50%">

<!-- ![](img/portfolio-cms-01.jpg)
![](img/portfolio-cms-02.jpg) -->

## Author

**name** _String_
Name of the portfolio author.

**bio** _String_
Short biography of the author.

**image** _String_
Image/Portrait of the portfolio author.

## Portfolio Items

**id** _String_
Unique ID of the portfolio item. Given by Firebase

**title** _String_
Title of the portfolio item.

**description** _String_
Description of the portfolio item.

**excerpt** _String_
Excerpt of the description. Used to display the item in the portfolio.

**link** _Object_

- **title** _String_
  The text for the link.
- **url** _String_
  The url to the link target (href)

**image** _url to jpg/png-file_
Feature image of the portfolio item.

**tags** _Array of Strings_
Tags of the portfolio item.
