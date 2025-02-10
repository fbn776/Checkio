import inspect

import click
from gettext import gettext as _


class CustomFormats(click.Group):
    # Custom Context class to override the help formatting
    def format_help(self, ctx, formatter):
        # Help text
        if self.help is not None:
            text = inspect.cleandoc(self.help).partition("\f")[0]
        else:
            text = ""

        if self.deprecated:
            text = _("(Deprecated) {text}").format(text=text)

        if self.name != "cli":
            formatter.write(click.style("Description:", fg="cyan", bold=True))
            formatter.write("\n")

        formatter.write_text(f"\n{"  " if self.name != "cli" else ""}{click.style(text, fg="green")}\n")

        # Usage
        formatter.write("\n")
        formatter.write(click.style("Usage:", fg="cyan", bold=True))
        formatter.write("\n")
        pieces = self.collect_usage_pieces(ctx)
        formatter.write(
            f"  {click.style(ctx.command_path, fg="bright_blue")} {click.style(" ".join(pieces), fg="blue", italic=True)}\n")

        # Options Section
        opts = []
        for param in self.get_params(ctx):
            rv = param.get_help_record(ctx)
            if rv is not None:
                opts.append(rv)
        if opts:
            formatter.write("\n")
            formatter.write(click.style("Options:", fg="cyan", bold=True))
            formatter.write("\n")
            for name, desc in opts:
                cmd_name = click.style(name, fg="yellow", bold=True, italic=True)
                cmd_desc = click.style(desc, fg="green")
                formatter.write(f"  {cmd_name} - {cmd_desc}\n")

        # Commands Section
        if self.commands:
            formatter.write("\n")
            formatter.write(click.style("Commands:", fg="cyan", bold=True))
            formatter.write("\n")

            for name, command in self.commands.items():
                cmd_name = click.style(name, fg="yellow", bold=True)
                cmd_help = click.style(command.get_short_help_str(), fg="green")
                formatter.write(f"  {cmd_name} - {cmd_help}\n")
