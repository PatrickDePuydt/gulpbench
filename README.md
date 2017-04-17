# gulpbench-mark-1
## v2.0.2
Bootstrap 4 Added

### CLI Tools
#### Bash Aliases
Calls down the GulpBench, installs NPM modules, removes the Git repo, launches the code, starts the server.
```
alias gulpit="take GulpBench-Sandbox \
				&& git clone https://github.com/PatrickDePuydt/gulpbench-mark-1.git \
				&& cd gulpbench-mark-1 \
				&& npm i \
				&& rm -rf .git \
				&& go \
				&& gulp"
```

#### Bash Function
Accepts a folder name as an arguement, for custom projects.
Calls down the GulpBench, installs NPM modules, removes the Git repo, launches the code, starts the server.
```
benchit() {
		take GBm1-$1 \
		&& git clone https://github.com/PatrickDePuydt/gulpbench-mark-1.git \
		&& mv ./gulpbench-mark-1 ./$1 \
		&& cd $1 \
		&& npm i \
		&& rm -rf .git \
		&& go \
		&& gulp
	}
```