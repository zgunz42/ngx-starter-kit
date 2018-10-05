import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

import { Schema as featureOptions } from './schema';

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { validateName } from '@schematics/angular/utility//validation';

export default function store(options: featureOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
      options.path = buildDefaultPath(project);
    }

    options.module = findModuleFromOptions(host, options);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    validateName(options.name);
    console.log(options);

    const templateSource = apply(url('./_files'), [
      template({
        ...strings,
        ...options,
      }),
      // move(parsedPath.path),
    ]);

    const rule = chain([branchAndMerge(chain([mergeWith(templateSource)]))]);

    return rule(host, context);
  };
}
