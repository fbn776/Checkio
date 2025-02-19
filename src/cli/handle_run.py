from core.runner.c_runner import CRunner


def handle_run(file_name, testcase):
    runner = CRunner()
    runner.execute(file_name, testcase)
