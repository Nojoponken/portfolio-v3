/* Code written by AI */
const preventEnterSubmit = (event) => {
  // Check if the key pressed was Enter
  // AND check that the user isn't currently in a textarea
  if (event.key === "Enter" && event.target.tagName === "INPUT") {
    event.preventDefault();
  }
};
/* End of code written by AI */

export { preventEnterSubmit };
