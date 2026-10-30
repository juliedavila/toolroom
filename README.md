# toolroom

Released editions of two security designs for AI-assisted engineering:

- **Ratchet** proves a weakness, verifies its fix in the running system and keeps a test that catches its return. Authority stays outside the AI agents that propose the tests.
- **Jig** works where code is written. It steers developers and their coding agents toward secure patterns and catches defects between the first edit and the merge.

Each edition is a folder of Markdown, YAML and runnable checks. The folder is generated from the design's sources and carries its own manifest, so you can verify it as is. Change a design by releasing a new edition; never edit one in place.

## Editions

| Design | Edition | Folder | Notes |
|---|---|---|---|
| Ratchet | 5.1.2 | [`editions/ratchet/5.1.2`](editions/ratchet/5.1.2) | Pins Jig 0.1.3 by the SHA-256 of its `edition.yaml` |
| Jig | 0.1.3 | [`editions/jig/0.1.3`](editions/jig/0.1.3) | Pins nothing, so it ships first |

Both editions carry the same shared layer (0.1.1, `seams.yaml`), which defines what may cross between the two designs.

## Where to start reading

- An executive deciding whether to fund a first phase: [`strategy-brief.md`](editions/ratchet/5.1.2/strategy-brief.md), then [`six-pager.md`](editions/ratchet/5.1.2/six-pager.md).
- Anyone else: [`00-start-here.md`](editions/ratchet/5.1.2/00-start-here.md), which says which file each kind of reader should open first.
- Jig: [`README.md`](editions/jig/0.1.3/README.md) in its folder.

## Verify an edition

`edition.yaml` lists every other file in its folder with a SHA-256, and a digest over that list. Ratchet's edition also ships its checking tools, which run on [Bun](https://bun.sh) with no npm packages:

```sh
cd editions/ratchet/5.1.2
bun ratchet-tools-verify.ts
```

The verifier checks the manifest, then runs every bundled tool against the edition's own test cases.

## Use the designs with Plumb

[Plumb](https://github.com/juliedavila/plumb) tracks a system as designed against the system as built. Each edition here ships the files Plumb reads (its `plumb/` folder), so you can add a design to a Plumb workspace directly:

```sh
plumb design add ratchet@5.1.2 --from github:juliedavila/toolroom --with-pins
```

Plumb fetches the edition at the tag `ratchet-v5.1.2`, checks every file against the manifest, and with `--with-pins` adds Jig 0.1.3 from the tag `jig-v0.1.3`. From a local clone, pass the clone's path to `--from` instead.

## What the hashes prove

The hashes prove that every file matches its edition's own manifest. No signature stands behind that manifest, so an edition is as trustworthy as this repository and the tag it comes from.

## What is not here yet

The design sources, the pipeline that builds and checks each edition, and the public evidence ledgers live elsewhere for now and will follow. Until then, each edition's `CHANGELOG.md` records what changed and why.

## License

MIT. See [LICENSE](LICENSE).
