# Data structures

## Testcase Identifier

```
<group_id>.<id>
```

Where

- `group_id` is the id of the group to which the testcase belongs (Its cannot contain `.`).
- `id` is the id of the testcase (It cannot contain `.`).

---

## Testcase Data

```json
{
  "group_id": "string",
  "id": "string",
  "title": "string",
  "description": "string",
  "data": [
    {
      "output": "string",
      "input": "string",
      "hidden": "boolean",
      "cli_args": [
        "string"
      ],
      "files": [
        {
          "name": "string",
          "content": "string"
        }
      ]
    }
  ]
}
```

Here

- `group_id` is the id of the group to which the testcase belongs.
- `id` is the id of the testcase.
- `title` is the title of the testcase.
- `description` is the description of the testcase.
- `data` (testunit) is the test units of the testcases.
    - `input` is the input of the test unit (optional).
    - `output` is the expected output of the test unit.
    - `hidden` is a boolean value which tells whether the test unit is hidden or not.
    - `cli_args` (array) is the command line arguments to be passed to the program (optional).
    - `files`(array) is the list of files to be created in the working directory (optional).
        - `name` is the name of the file.
        - `content` is the content of the file.

---

## Submitted files

The data representation of the file submitted by the user.

```json
[
  {
    "name": "string",
    "content": "string"
  }
]
```

---

## Evaluation

```json
{
  "setup_completed": "boolean",
  "tests": [
    {
      "input": "2 3",
      "cli_args": [
        "4",
        "4"
      ],
      "expected_output": "8",
      "output": "5\n",
      "passed: "boolean",
    }
  ],
  "error": "string"
}
```
