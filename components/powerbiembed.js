import React, { Component } from 'react';
import WebView from './webView';

class PowerBIEmbed extends Component {
    constructor(props) {
        super(props);
        this.configuration = this.setConfiguration(props);
    }

    merge = (target, source) => {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object) Object.assign(source[key], this.merge(target[key], source[key]));
        }
        Object.assign(target || {}, source);
        return target;
    }
    setConfiguration = (props) => {
        let embedConfiguration = {
            type: 'report',
            tokenType: 1,
            accessToken: props.accessToken,
            embedUrl: props.embedUrl,
            id: props.id,
            permissions: 7,
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
                layoutType: 1,
            },
        };
        if (('language' in props)) {
            embedConfiguration.settings.localeSettings = {
                language: props.language,
                formatLocale: props.language,
            };
        }

        if (('embedConfiguration' in props)) {
            embedConfiguration = this.merge(embedConfiguration, props.embedConfiguration);
        }

        return JSON.stringify(embedConfiguration);
    }

    getTemplate = configuration => (`<!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width">
        <script src="https://cdn.jsdelivr.net/npm/powerbi-client@2.8.0/dist/powerbi.min.js"></script>
        <style>
            html,
            body,
            #reportContainer {
                width: 100%;
                height: 100%;
                margin: 0;
                background-color: 'white';
                -webkit-overflow-scrolling: touch;
            }
            iframe {
                border: 0px
            }
        </style>
    </head>
    
    <body>
        <div id="reportContainer"></div>
        <script>
        var models = window['powerbi-client'].models;
        var config = ${configuration};
        var reportContainer = document.getElementById('reportContainer');
        var report = powerbi.embed(reportContainer, config);
        </script>
    </body>
    </html>`
    );


    render() {
        const html = this.getTemplate(this.configuration);
        return (
            <WebView source={{ html: html }} />
        );
    }
}

export default PowerBIEmbed;
