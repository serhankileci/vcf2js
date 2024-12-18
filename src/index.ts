import fs from "node:fs/promises";

export const vcf2js = async (pathOrVcf: string): Promise<Record<string, string>[]> => {
	const content = pathOrVcf.includes(".vcf") ? await fs.readFile(pathOrVcf, "utf-8") : pathOrVcf;

	return content
		.split("BEGIN:VCARD")
		.slice(1)
		.map(card => {
			const data: Record<string, string> = {};
			const lines = card.split("\n");

			for (const line of lines) {
				const [key, value] = line.split(":");

				if (line.startsWith("END:VCARD") || !key || !value) {
					break;
				}

				data[key] = value;
			}

			return data;
		});
};
