# TODOs

- Should an empty input and empty output be considered as a valid test case?
    - Currently, it is considered as a valid test case.
- [x] Should we use `threads` or `multiprocessing` for parallel processing?
    - Use: Starting the flask server
    - `multiprocessing` is better for CPU-bound tasks, while `threads` are better for I/O-bound tasks.
    - Currently, we are using `threads` for parallel processing.
- [ ] Currently, when the `run` command is called it first finds the extension of the file and returns it (if one in the
  specified, then `None` is returned).
  This value is then matched against a dict of Runner classes.
  Then we `.get()` the dict and if not `None` then proceed. But this can lead to inconsistency, right? What if the a
  lang is present in the find lang but not in dict. So when adding a new lang support, two places need to be updated