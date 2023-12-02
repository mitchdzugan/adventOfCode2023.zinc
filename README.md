# system dependencies
yarn
```bash
sudo npm i -g yarn
```

# usage
install dependencies
```bash
# in project dir
yarn
```
run
```bash]
yarn start # runs solver for all advent of code days
yarn start DAY # runs solver for day DAY of advent of code
```

# misc
transpiler is still super early so repo contains some files that would normally be in the stdlib (namely [`/src/+.zn`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/src/+.zn) and the [`/src/+/`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/src/+) directory). Everthing relevant to advent of code solutions is in the [`/src/aoc/`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/src/aoc) directory

also normally the [`/zinc/`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/zinc) directory would be excluded from git via the [.gitignore](https://github.com/mitchdzugan/adventOfCode2023.zinc/blob/main/.gitignore#L7) but it is included as it can help understanding the code.

the [`/zinc/src-cljs/`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/zinc/src-cljs) directory contains a clone of all source files in the repo except with a `.cljs` file extension. This can be useful since the syntax is mostly based on clojure and there is no syntax highlighting available for the `.zn` files so the `.cljs` versions will be easier to read in the git repo.

the [`/zinc/translated-js/`](https://github.com/mitchdzugan/adventOfCode2023.zinc/tree/main/zinc/translated-js) directory contains the transpiled javascript for each source file in the repo. This may be easier to understand what the code is actually doing but it can also get confusing to read since it is machine generated.
