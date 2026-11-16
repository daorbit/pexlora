const AI_VALUE_PATTERN =
  /midjourney|dall[\s·-]?e|openai|chatgpt|stable[\s-]?diffusion|sdxl|firefly|comfyui|automatic1111|novelai|leonardo|\bflux\b|imagen|gemini|ideogram|\bsora\b|\bveo\b|runway(?:ml)?|pika\s?labs|\bkling\b|\bluma\b|synthesia|heygen|\bsuno\b|\budio\b|elevenlabs|copilot|anthropic|trainedAlgorithmicMedia|compositeWithTrainedAlgorithmicMedia|algorithmicMedia|c2pa|made with ai|ai[\s-]generated/i;

const AI_KEY_PATTERN =
  /digitalsourcetype|parameters|prompt|workflow|negative|sampler|cfg[\s_]?scale|generat|ai[\s_]?model/i;

export function isAiTag(key: string, value: string) {
  return AI_KEY_PATTERN.test(key) || AI_VALUE_PATTERN.test(value);
}
