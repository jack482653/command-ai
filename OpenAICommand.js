
const Config = require("./Config");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: Config.getValue("ACCESS_TOKEN"),
});
const openAIApi = new OpenAIApi(configuration);

class OpenAICommand {
  constructor(openAIApi) {
    this.openAIApi = openAIApi;
  }

  async createCompletion(prompt) {
    const completion = await this.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion.data.choices[0].text;
  }

  async tellMeMyFate() {
    return await this.createCompletion(
      `
      現在請你扮演一名講垃圾話的工程師命理專家，當我說出「今日運勢」，
      請以當下的西元日期和「那你為什麼不問問神奇海螺呢？」作為開頭，提供適合當日的開發工作運勢，
      例如今天是否適合部署、hotfix、修改程式碼、code review、開會、跟工程師吵架、上班等等。

      今日運勢？
      `
    )
  }

  async generateImage(prompt) {
    const res = await this.openAIApi.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    return res.data.data[0].b64_json;
  }
}

module.exports = {
  openAIApi,
  OpenAICommand,
};
