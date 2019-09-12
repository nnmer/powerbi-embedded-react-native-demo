import React, {Component, Fragment} from 'react';
import PowerBIEmbed from './components/powerbiembed'
import config from './powerbi_config.json'


class App extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const embedConfig = {
      type: 'report',
      tokenType: 1,// => models.TokenType.Embed,
      accessToken: config.accessToken,
      embedUrl: config.embedUrl,
      id: config.reportId,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
        layoutType: 2,// => models.LayoutType.MobilePortrait
      },
    }
    return (
        <PowerBIEmbed
            embedConfiguration={embedConfig}
        />
  );
    }
};

export default App;
