const fs = require("fs");
const path = require("path");
const assert = require("assert");
const InputMask = require("../index");

const TEMPLATE = fs.readFileSync(
  path.join(__dirname, "/input-mask-phone.template.html")
);

const EVENTS = {};

/**
 * send an input event
 * @param {HTMLElement} el the element to sent the event to
 */
EVENTS.input = (el) => {
  el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
};

const inputMaskSelector = () => document.querySelector(".usa-input-mask");
const tests = [
  { name: "document.body", selector: () => document.body },
  { name: "input mask", selector: inputMaskSelector },
];

tests.forEach(({ name, selector: containerSelector }) => {
  describe(`input mask component initialized at ${name}`, () => {
    const { body } = document;

    let root;
    let input;
    let shell;

    beforeEach(() => {
      body.innerHTML = TEMPLATE;
      InputMask.on(containerSelector());

      root = inputMaskSelector();
      input = root.querySelector(".usa-input");
    });

    afterEach(() => {
      InputMask.off(containerSelector());
      body.textContent = "";
    });

    it("formats a US telephone number to (123) 456-7890", () => {
      input.value = "1234567890";

      EVENTS.input(input);
      shell = root.querySelector(".usa-input-mask__shell");
      assert.strictEqual(shell.textContent, "(123) 456-7890");
    });
  });
});
