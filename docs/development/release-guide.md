---
title: Release Guide
sidebar_position: 6
---

This document describes how to perform a Headlamp release.

The idea is that we list the steps here as a guide and automate it along the way, so the number of steps is reduced as much as possible in the future.

## Version bumping

We follow the [semantic versioning](https://semver.org/) guide.

## Install the Headlamp releaser

The Headlamp releaser script helps with the different release steps.
Before releasing Headlamp, you need to make sure you can use the
Headlamp releaser script:

1. In a Headlamp repo clone, go to _tools/releaser_
2. Install and build the tool:
   * npm run install
   * npm run build
   * npm link
3. Verify you can run the releaser:
   * releaser -h

## Release all the shipped plugins that have changes

Any PRs that have been merged to shipped plugins should be available
in the new version of Headlamp, and for updating the plugins we
ship, we need to make sure we have their new version published.

Here are the steps to publish plugins:

1. Install the plugin-releaser if you don't have it
   * npm run install
   * npm run build
   * npm link
2. List the plugins that have changes
   * plugin-releaser list --verbose --changed
3. For the shipped plugins in the list from the command above, do:
   * plugin-releaser bump MY_PLUGIN X.Y.Z # X.Y.Z is the new version


## Steps to perform a Headlamp release

When ready to perform a release (changes worth releasing since last time is done, QA is done), then:

### 1. Create a new release candidate branch

The following command bumps the release version of the Healdamp app
and creates a commit:

1. `releaser start X.Y.Z`
2. `git log  # for checking that the commit was done`

### 2. Push this branch and create a PR

1. `git push origin hl-rc-X.Y.Z`
2. Create the PR through `gh` or via the UI

### 3. Build the apps associated with the release

The following command builds the apps for the release candidate branch, for all platforms:

1. `releaser ci app --build hl-rc-X.Y.Z`

You can use `--platform` to build for a specific platform.

### 4. Create the release management issue and release notes draft

Go to GitHub Actions and run the [Create release draft](https://github.com/headlamp-k8s/headlamp/actions/workflows/draft-release.yml) workflow for the `hl-rc-X.Y.Z` branch.

After the issue is done, coordinate with contributors on Slack to perform the manual testing.

### 4. Prepare the release notes

Check the list of changes since the last release:

```
git log --oneline --cherry --topo-order PREV_TAG..HEAD
```

Then go to the release management issue created in the previous step and fill the release notes in accordingly. For that:

1. Check one by one the commits and assign them to the respective category.
2. Summarize the contribution in a human-readable way
3. Not all commits need to be in the release notes
4. Group commits that are related changes if they are done by the team of by the same individual contributor
5. For non-core individual contributors, add a "Thanks to @USER_NAME" message at the end of the summary line

Once the notes are done and acknowledged by the release manager, copy them to the actual release draft created in the previous step.

### 5. Upload tested/built artifacts to the release draft

You can use the following command to verify the app build runs:

```shell
  releaser ci app --list
```

Copy the IDs of the builds you want to upload to the release draft.

### 5. App signing

The build scripts handle app signing.

### 6. Generate Apps

Generate the apps for each the Linux, Windows, and Mac platforms by running the "Build and upload PLATFORM artifact" actions against the "rc-X.Y.Z".

### 7. Download and test Artifacts

Download the artifacts, test them and, if everything goes well, upload them to the new release's assets area.

### 8. Push Assets

Upload the binary to the release's assets with the script.

Run the push-assets.js script for pushing assets. This script pushes the assets and automatically sets the right type for them. It also updates and uploads a checksums file:

```shell
   GITHUB_TOKEN=MY_TOKEN_123 node ./app/scripts/push-release-assets.js v0.19.0 Headlamp....tar.gz
```

Note: If you use the gh command line tool, you can use `gh auth token`. To create a new GITHUB_TOKEN, see the document [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).


### 9. Push the new tag

Go to the main branch and merge the rc-X.Y.Z in, then tag the branch (notice the **v** before the version number):

```shell
git tag vX.Y.Z \-a \-m “Release X.Y.Z”
```


Push the new release commit and tags:

Note: DO NOT RUN THIS BELOW EXCEPT ON NEW FEATURE RELEASES.

```shell
git checkout main

git merge rc-X.Y.X \# (this should NOT create a merge commit since the bump commit is the only difference)

git push origin main

git push \--tags
```

### 10. Container images and distribution channels (flathub, homebrew)

Container images are built automatically on every tag creation and pushed to the GitHub Container Registry (ghcr.io).

Other distribution channels like flathub, homebrew, minikube, will be done by automatically opened PRs.

### 11. Announce on social media

Ask someone in the social team (Joaquim or Lexi) to toot/tweet/post about it from the social media accounts.
