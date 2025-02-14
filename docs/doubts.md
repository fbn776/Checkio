# TODOs

- Should an empty input and empty output be considered as a valid test case?
  - Currently, it is considered as a valid test case.
- Should we use `threads` or `multiprocessing` for parallel processing?
  - Use: Starting the flask server
  - `multiprocessing` is better for CPU-bound tasks, while `threads` are better for I/O-bound tasks.
  - Currently, we are using `threads` for parallel processing.