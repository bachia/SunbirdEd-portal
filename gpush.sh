echo -n "Enter Commit Message: "
read msg
git tag -d release-1.14.0 && git push origin :release-1.14.0
git commit -a -m "$msg" && git push origin release-1.14.0-branch
git tag release-1.14.0 && git push origin release-1.14.0
