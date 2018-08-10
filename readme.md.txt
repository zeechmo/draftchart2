to run local:

in this directory in node cmd prompt run:
enduro dev or enduro start (prod)
be sure to use port 5000

to run on production:
su - to get to root
in /root/draftchart2 directory
git pull to get latest code
run:  pm2 start enduro -- start

