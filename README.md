# Alliance tool

project is still WIP. progress might be slow.

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

Restructure the folders to make more sense

login and user authentication

player tools
-able to mark down troops in own villages and
-tag villages as def or off
-set TS lvls if the village has artifacts
-hero boots lvl

Planner
-see send and arrival times.
-sorting for planner table.

Def tool
-mark villages with incoming attacks with timestamp, TS lvl, artefact and hero boots if noticed.
-make a table that shows wanted amount of def and players closest villages with def troops available

replace SQL queries with Prisma ORM

automatic database updating from game API

possibility to have multiple servers at once in database
-new table for every new table named with server name?

Page to show and manage users own villages easily.

put the whole thing in docker container and in to the cloud

Discord hooks?
-use tesseract for image text reading and report incoming attacks automatically?

encrypt troops and tags in database?

## License

[MIT](https://choosealicense.com/licenses/mit/)
