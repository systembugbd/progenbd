# Node Project Generator

## progenbd

A CLI help to generate a progenbd.sh configuration file.

### Usage

```sh
npm i progenbd --save
```

## TODO

* [x] Choose a library to use for argument parsing and user interaction 
* [ ] CLI will ask question:
  * [ ] Check if progenbd.json already exists...
    * Ask if they what to override
  * [ ] what is the name of the project?
    * default to current directory name
  * [ ] What type of project?
    * node-express
    * static
    * react
    * vue
    * static-build
    * lambda
  * [ ] Which file is the entry point?
  * [ ] Whould you like to specify alias?
    * Allow one or more
  * [ ] Would you like to add progenbd-build to your package.json?
    * Only prompt if react / vue or static-build
  * [ ] Would you like to deploy?

