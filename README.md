# collection roulette

Browse trough your collection of media (pictures, videos, documents, ...) mostly at random. Find trash or gems and clear some disk space

## Maturity

Really really reaaally early prototyping. The project basically helps discovering some current frameworks or stacks like [Next.js](https://github.com/vercel/next.js), [Prisma](https://github.com/prisma), [Docker](https://github.com/docker), [Express](https://github.com/expressjs)

## Development / Testing / Publishing

### Export Docker Image to file

`docker image save picture-browser -o picture-browser.tar`

### Permissions for mounted volumes on Synology DiskStation

To give read/write access, the group `SYSTEM` requires read/write access