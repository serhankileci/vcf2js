#!/usr/bin/env node
import { vcf2js } from "./index.js";

const [input, flag] =
	process.env.NODE_ENV === "production" ? process.argv.slice(2) : ["protos", "protos", ""];
const usage = `
To convert the protobuf file(s) into a GraphQL schema, use the following command:

<input>: Path to a .vcf file or a folder that has .vcf files.

vcf2js <input>

vcf2js example.vcf
vcf2js path/to/folder/with/vcf/files
`;
const helpFlags = ["-h", "--help", "help"];
const defaultOutputFilename = "vcf.json";

if (!input) {
	console.info(usage);
	process.exit(1);
}

if (flag && helpFlags.includes(flag)) {
	console.info(usage);
	process.exit(0);
}

vcf2js(input)
	// ...
	.catch(console.error);
