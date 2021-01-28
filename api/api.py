import asana
from flask import Flask

app = Flask(__name__)

app.config.from_object('config')
app.config["DEBUG"] = True

client = asana.Client.access_token(app.config['ASANA_TOKEN'])

@app.route("/workspaces")
def select_workspace():
  workspaces_out = {}
  workspaces = result = client.workspaces.get_workspaces({}, opt_pretty=True)
  for workspace in workspaces:
    workspaces_out[workspace.get('name')] = workspace

  return workspaces_out

@app.route("/workspace/<workspace_id>")
def select_project(workspace_id):
  projects_out = {}
  projects = result = client.projects.get_projects({'workspace': workspace_id}, opt_pretty=True)
  for project in projects:
    projects_out[project.get('name')] = project

  return projects_out

@app.route("/project/<project_id>")
def select_section(project_id):
  sections_out = {}
  sections = result = client.sections.get_sections_for_project(project_id, {}, opt_pretty=True)
  for section in sections:
    sections_out[section.get('name')] = section

  return sections_out

@app.route("/section/<section_id>")
def get_point_counts(section_id):

  points_field = app.config['POINTS_FIELD']

  points_sum = {}
  assignees = {}
  task_list = {}

  tasks = client.tasks.get_tasks_for_section(section_id, {}, opt_pretty=True, fields="assignee,name,custom_fields")

  for task in tasks:
    if task.get('assignee') == None:
      assignee = {'name' : 'Unassigned'}
    else:
      assignee_gid = task.get('assignee').get('gid') 
      assignees[assignee_gid] = assignees.get(assignee_gid) or client.users.get_user(task.get('assignee').get('gid'))
      assignee = assignees[assignee_gid]
    for field in task.get('custom_fields'):
      if field.get('name') == points_field:
        task_list[task.get('gid')] = {'name' : task.get('name'), 'assignee': assignee.get('name'), 'points' : int(field.get('number_value') or 0)}
        points_sum[assignee.get('name')] = points_sum.get(assignee.get('name'),0) + int(field.get('number_value') or 0)

  return points_sum

if __name__ == "__main__":
  app.run()
