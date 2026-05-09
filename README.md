# GB-LicenseEmbeds
Quick and dirty repo for license embeds on GameBanana, designed to mimic how GitHub presents its licensing summaries.  

> [!IMPORTANT] 
> As of 9 May 2026, the license embed badges are now locally hosted on GitHub Pages to try to alleviate some issues with adblockers blocking the images from loading. It is recommended to update any existing license embeds on your submissions to use the new URLs.

### Example

![License Embed Example](https://user-images.githubusercontent.com/11445611/226152174-05aa8fa9-c2c3-488d-8e26-18545e108c96.png)

# Web Interface Usage
* Navigate to https://alexankitty.github.io/GB-LicenseEmbeds/LicenseSelector.html in your broswer.
* Use the drop down to select the license type you need.
* You can edit the html as needed, the page will also update once you stop typing.
* Click copy, or select all of the text in the codeblock and copy it.
* In GameBanana, open the **Edit** page for your submission.
* Select the **Ownership** tab and scroll down to the **License** area.
* Select the **Source** tab in the **License** area and paste the contents of the `html` file.
* Configure the **License Checklist** appropriately, then save your submission.

# GameBanana Web App
* You can install this on GameBanana and use it directly on the site [here](https://gamebanana.com/apps/924).

# Usage
* Open the `html` file of the license you would like to use in a text editor and copy its contents.
* In GameBanana, open the **Edit** page for your submission.
* Select the **Ownership** tab and scroll down to the **License** area.
* Select the **Source** tab in the **License** area and paste the contents of the `html` file.
* Configure the **License Checklist** appropriately, then save your submission.

# Other licenses
If you need another license type added that GitHub has a summary for, let me know or make a PR and update an existing one.

# Contributing
Contributions are welcome! If you have a license type that you wanted added that is not included in this repo, feel free to make a PR to add it.

When making a PR, please be sure to follow the format of the existing licenses, including the license text and the license shield.

Please also make sure to run `./scripts/build_img_dir.sh` to setup the license shields to be hosted on the repo.

If your chosen license badge is an SVG, please make sure you have inkscape installed as the script will leverage that to convert the SVG to a PNG.

## License Shields
* CC license shields are sourced from [licensebuttons.net](https://licensebuttons.net/).
* Text license shields are generated from [Shields.io](https://shields.io/).

## Web interface libraries
* [code-input](https://github.com/WebCoder49/code-input) and [highlight-js](https://highlightjs.org) for the syntax highlighting.
* Uses [Nord](https://www.nordtheme.com/ports/highlightjs) port to highlight-js for the theming.

## Legal Disclaimer
All of the licenses in this repo are provided as-is with no recommendations on which license you should pick. It is still your responsibility to do the research on the license type that best fits your project and to consult an attorney as needed.
