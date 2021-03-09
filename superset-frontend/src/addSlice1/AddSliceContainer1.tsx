/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { Panel } from 'react-bootstrap';
import Button from 'src/components/Button';
import Select from 'src/components/Select';
import { t } from '@superset-ui/core';


interface Datasource {
  label: string;
  value: string;
}

export type AddSliceContainerProps = {
  datasources: Datasource[];
};

export type AddSliceContainerState = {
  datasourceId?: string;
  datasourceType?: string;
  datasourceValue?: string;
  visType: string;
};

const styleSelectContainer = { width: 600, marginBottom: '10px' };

export default class AddSliceContainer extends React.PureComponent<
  AddSliceContainerProps,
  AddSliceContainerState
> {
  constructor(props: AddSliceContainerProps) {
    super(props);
    this.state = {
      visType: 'table',
    };

    this.changeDatasource = this.changeDatasource.bind(this);
    this.changeVisType = this.changeVisType.bind(this);
    this.gotoSlice = this.gotoSlice.bind(this);
  }

  exploreUrl() {
    const formData = encodeURIComponent(
      JSON.stringify({
        viz_type: this.state.visType,
        datasource: this.state.datasourceValue,
      }),
    );
    return `/superset/explore/?form_data=${formData}`;
  }

  gotoSlice() {
    window.location.href = this.exploreUrl();
  }

  changeDatasource(option: { value: string }) {
    this.setState({
      datasourceValue: option.value,
      datasourceId: option.value.split('__')[0],
    });
  }

  changeVisType(visType: string) {
    this.setState({ visType });
  }

  isBtnDisabled() {
    return !(this.state.datasourceId && this.state.visType);
  }

  render() {
    return (
      <div className="container">
        <Panel>
          <Panel.Heading>
            <h3>{t('Create a new Stream')}</h3>
          </Panel.Heading>
          <Panel.Body>
            <div>
              <p>{t('Name your stream')}</p>
              <div style={styleSelectContainer}>
              <input
                type="text"
                name="stream_name"
                value=""
                placeholder={t('Name your stream')}
              />
              </div>
            </div>
            <br />
            <div>
              <p>{t('Choose a stream type')}</p>
              <div style={styleSelectContainer}>
                <Select
                  clearable={false}
                  ignoreAccents={false}
                  name="select-datasource"
                  placeholder={t('Choose a stream type')}
                />
              </div>
            </div>
            <hr />
            <Button
              buttonStyle="primary"
              disabled={this.isBtnDisabled()}
              onClick={this.gotoSlice}
            >
              {t('Create new stream')}
            </Button>
            <br />
            <br />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
