## Documentaion
1. Run `npm i` to install all dependancies.
2. Run `npm start` to start the project.
3. Run `npm test` to execute tests.

### Comments
1. I used context with the idea that app can be scaled, if not we can just pass props.
2. As we don't use vaccination date from response, we can sanatize the response and remove that key.
I left it just in case we need it.
3. I can use MaterialUI or tailwind library for stylings and componens (working with them for a few years) but thought you might want to see my pure CSS skills.
4. I've added sorting for each column. (Potential improvment is to add sorting order to context and reset it on "clear" click).