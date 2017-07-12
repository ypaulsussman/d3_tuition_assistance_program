# TAP Scatter Plot:

Y Paul Sussman: July 11th, 2017; Version 1.0

## Visualization Overview
This graph displays the disbursement of ~9,000 grants via the [New York State Tuition Assistance Program](https://www.hesc.ny.gov/pay-for-college/apply-for-financial-aid/nys-tap.html), over the years 2000-2015. The x-axis records the number of student recipients in a given disbursement, while the y-axis records the monetary value.

Each disbursement is color-coded by the university's public/private status, and mouseover reveals the disbursement's university, year, specific student count, and specific monetary value. Finally, the table is both zoom- and pan-responsive (_to better enable examination of the clustered datapoints._)


## Getting Started

Fork, clone, or download the project.

Download the Tuition Assistance Program `.csv` file from [data.gov](https://catalog.data.gov/dataset/tuition-assistance-program-tap-recipients-dollars-by-college-sector-group-and-level-of-stu), and add it to the directory.

Strip all `$` characters from the `.csv` file.

Download [Python 2.7.x](https://www.python.org/downloads/release/python-2713/), if you don't have it preinstalled. (_You can check by running_ `python -V` _in your command line._)

Inside this directory, run `python -m SimpleHTTPServer` from the command line.

Navigate to `localhost:8000` in your browser.

## Built With

* HTML5, CSS3, JavaScript (ES5), and D3.js.

## Learning Value
There were two major goals I wanted to achieve with this project. The first was to _build_ something with D3.js, rather than continuing to read through examples -- to take a dataset I was unfamiliar with, and to visually render it in an approachable way. I'm happy with those results, though some questions (_how to inject regular expressions into_ `d3.tickFormat()`_, for example, or how to create zoom-responsive circle radii_) will require further research.

The second was to make something outside of the greenfield format I'd become used to. The life of a junior developer is one of frequent work on mature codebases, and so I'd wanted to practice reading and adapting code that was both preexisting and largely uncommented. Here, too, I had a fun experience -- though I imagine the process will be different when I try it with an actual full-stack application.

## Demo
<p align="center">
  <img src="tap_walkthrough.gif" alt="walkthrough gif"/>
</p>
