# Alliance tool

Alliance tool is a tool for the browser game Travian.

The program currently has a tool to search for players of selected alliances and give the players villages tags.
The tagged villages are used in the planner page to calculate distances and travel times and are inserted into a scatter chart for visual presentation.

## Usage

to try out the tool, run commands in both server and frontend folders.

```command line
npm install
npm run dev
```

you'll need a postgres database to use the program in localhost
the program was tested with postgres running in docker container.

to create needed database tables edit the index.ts file to run the needed functions.

## Planned features

login and user authentication

Page to show and manage users own villages easily.

Improvements to the planner page to see send and arrival times.

sorting for planner page table.

## License

[MIT](https://choosealicense.com/licenses/mit/)
