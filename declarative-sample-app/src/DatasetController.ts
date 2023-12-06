export class DatasetController {
    datasetDef: string = `The Dataset Component in the <code>ng-declarative</code> framework is a versatile component designed for streamlined data management. With the ability to load data from various sources, support dynamic schemas, and provide reactive updates, it enhances the efficiency and flexibility of dataset handling in the applications. Leveraging RxJS observables, built-in error handling, and seamless integration within the angular, the Dataset Component facilitates robust data-driven functionalities, making it an essential tool for sophisticated declarative app development.`;
    example1source: string = `<row id="QM8j1dv">
          <column id="YWM75Ka">
            <row css-class="text-center" justify-contents="center" padding="medium" id="kbI8e4d5">
              <column id="H37sUMN">
                <label width="slim" theme="bold,heading-smallest" text="Name" id="RRu8ew3iq"/>
              </column>
              <column id="ehfwBAb">
                <label width="slim" theme="bold,heading-smallest" text="Middle Name" id="ewfcds"/>
              </column>
              <column id="Fb6vyFl">
                <label width="slim" theme="bold,heading-smallest" text="Last Name" id="werffew"/>
              </column>
            </row>
            <row id="Z7v1O93">
              <column id="T0FJ71i">
                <loop items="app.datasets.names.dataset$" id="QCB0osk">
                  <row css-class="text-center" justify-contents="center" padding="medium" id="krbI8e4d5">
                    <column id="H37serUMN">
                      <label width="slim" theme="bold,heading-smallest" text="%%item.firstname%%" id="RRu8reew3iq"/>
                    </column>
                    <column id="ewhfwBAb">
                      <label width="slim" theme="bold,heading-smallest" text="%%item.middlename%%" id="ewfrcds"/>
                    </column>
                    <column id="Fb6vreyFl">
                      <label width="slim" theme="bold,heading-smallest" text="%%item.middlename%%" id="werfrefew"/>
                    </column>
                  </row>
                </loop>
              </column>
            </row>`;

    constructor(private app: any) {

    }
}