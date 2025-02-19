/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  ReactNativeFirebaseModule,
  ReactNativeFirebaseNamespace,
  ReactNativeFirebaseModuleAndStatics,
} from '@react-native-firebase/app-types';

/**
 * Firebase Remote Config package for React Native.
 *
 * #### Example 1
 *
 * Access the firebase export from the `config` package:
 *
 * ```js
 * import { firebase } from '@react-native-firebase/config';
 *
 * // firebase.config().X
 * ```
 *
 * #### Example 2
 *
 * Using the default export from the `config` package:
 *
 * ```js
 * import config from '@react-native-firebase/config';
 *
 * // config().X
 * ```
 *
 * #### Example 3
 *
 * Using the default export from the `app` package:
 *
 * ```js
 * import firebase from '@react-native-firebase/app';
 * import '@react-native-firebase/config';
 *
 * // firebase.config().X
 * ```
 *
 * @firebase config
 */
export namespace Config {
  /**
   * A pseudo-enum for usage with ConfigSettingsRead.lastFetchStatus to determine the last fetch status.
   *
   * #### Example
   *
   * ```js
   * firebase.config.LastFetchStatus;
   * ```
   */
  export interface LastFetchStatus {
    /**
     * A value indicating that the last fetch was successful.
     *
     * ```js
     * firebase.config.LastFetchStatus.SUCCESS;
     * ```
     */
    SUCCESS: 'success';

    /**
     * A value indicating that the last fetch failed.
     *
     * ```js
     * firebase.config.LastFetchStatus.FAILURE;
     * ```
     */
    FAILURE: 'failure';

    /**
     * A value indicating that the last fetch was throttled.
     *
     * This usually occurs when calling fetch often with a low expiration duration.
     *
     * ```js
     * firebase.config.LastFetchStatus.THROTTLED;
     * ```
     */
    THROTTLED: 'throttled';

    /**
     * A value indicating that no fetches have occurred yet.
     *
     * This usually means you've not called fetch yet.
     *
     * ```js
     * firebase.config.LastFetchStatus.NO_FETCH_YET;
     * ```
     */
    NO_FETCH_YET: 'no_fetch_yet';
  }

  /**
   * A pseudo-enum for usage with ConfigValue.source to determine the value source.
   *
   * #### Example
   *
   * ```js
   * firebase.config.ValueSource;
   * ```
   */
  export interface ValueSource {
    /**
     * If the value was retrieved from the server.
     *
     * ```js
     * firebase.config.ValueSource.REMOTE;
     * ```
     */
    REMOTE: 'remote';
    /**
     * If the value was set as a default value.
     *
     * ```js
     * firebase.config.ValueSource.DEFAULT;
     * ```
     */
    DEFAULT: 'default';
    /**
     * If no value was found and a static default value was returned instead.
     *
     * ```js
     * firebase.config.ValueSource.STATIC;
     * ```
     */
    STATIC: 'static';
  }

  /**
   * Firebase Remote Config statics.
   *
   * ```js
   * firebase.config;
   * ```
   */
  export interface Statics {
    /**
     * A pseudo-enum for usage with ConfigValue.source to determine the value source.
     *
     * #### Example
     *
     * ```js
     * firebase.config.ValueSource;
     * ```
     */
    ValueSource: ValueSource;

    /**
     * A pseudo-enum for usage with `firebase.config().lastFetchStatus` to determine the last fetch status.
     *
     * #### Example
     *
     * ```js
     * firebase.config.LastFetchStatus;
     * ```
     */
    LastFetchStatus: LastFetchStatus;
  }

  /**
   * An Interface representing a Remote Config value.
   */
  export interface ConfigValue {
    /**
     * Where the value was retrieved from.
     *
     * - `remote`:  If the value was retrieved from the server.
     * - `default`: If the value was set as a default value.
     * - `static`: If no value was found and a static default value was returned instead.
     *
     * See the `ValueSource` statics definition.
     *
     * #### Example
     *
     * ```js
     * const configValue = firebase.config().getValue('beta_enabled');
     * console.log('Value source: ', configValue.source);
     * ```
     */
    source: 'remote' | 'default' | 'static';

    /**
     * The returned value.
     *
     * #### Example
     *
     * ```js
     * const configValue = firebase.config().getValue('beta_enabled');
     * console.log('Value: ', configValue.value);
     * ```
     */
    value: undefined | number | boolean | string;
  }

  /**
   * An Interface representing multiple Config Values.
   *
   * #### Example
   *
   * ```js
   * const values = firebase.config().getAll();
   * ```
   */
  export interface ConfigValues {
    [key: string]: ConfigValue;
  }

  /**
   * An Interface representing settable config settings.
   *
   * #### Example
   *
   * The example below makes use of the React Native `__DEV__` global JavaScript variable which
   * is exposed.
   *
   * ```js
   * await firebase.config().setConfigSettings({
   *   isDeveloperModeEnabled: __DEV__,
   * });
   * ```
   */
  export interface ConfigSettings {
    /**
     * If enabled, default behaviour such as caching is disabled for a better debugging
     * experience.
     */
    isDeveloperModeEnabled: boolean;
  }

  /**
   * An Interface representing a Config Defaults object.
   *
   * #### Example
   *
   * ```js
   * await firebase.config().setDefaults({
   *   experiment_enabled: false,
   * });
   * ```
   */
  export interface ConfigDefaults {
    [key: string]: number | string | boolean;
  }

  /**
   * The Firebase Remote Config service interface.
   *
   * > This module is available for the default app only.
   *
   * #### Example
   *
   * Get the Remote Config service for the default app:
   *
   * ```js
   * const defaultAppRemoteConfig = firebase.config();
   * ```
   */
  export class Module extends ReactNativeFirebaseModule {
    /**
     * The number of milliseconds since the last Remote Config fetch was performed.
     */
    lastFetchTime: number;
    /**
     * Whether developer mode is enabled. This is set manually via {@link config#setConfigSettings}
     */
    isDeveloperModeEnabled: boolean;
    /**
     * The status of the latest Remote Config fetch action.
     *
     * See the `LastFetchStatus` statics definition.
     */
    lastFetchStatus: 'success' | 'failure' | 'no_fetch_yet' | 'throttled';

    /**
     * Moves fetched data to the apps active config.
     * Resolves with a boolean value of whether the fetched config was moved successfully.
     *
     * #### Example
     *
     * ```js
     * // Fetch values
     * await firebase.config().fetch();
     * const activated = await firebase.config().activate();
     *
     * if (activated) {
     *  console.log('Fetched values successfully activated.');
     * } else {
     *   console.log('Fetched values failed to activate.');
     * }
     * ```
     */
    activate(): Promise<boolean>;

    /**
     * Fetches the remote config data from Firebase, as defined in the dashboard. If duration is defined (seconds), data will be locally cached for this duration.
     *
     * #### Example
     *
     * ```js
     * // Fetch and cache for 5 minutes
     * await firebase.config().fetch(300);
     * ```
     *
     * @param expirationDurationSeconds Duration in seconds to cache the data for. To skip cache, use a duration of 0.
     */
    fetch(expirationDurationSeconds?: number): Promise<null>;

    /**
     * Fetches the remote config data from Firebase, as defined in the dashboard.
     *
     * Once fetching is complete this method immediately calls activate and returns a boolean value of the activation status.
     *
     * #### Example
     *
     * ```js
     * // Fetch, cache for 5 minutes and activate
     * const activated = await firebase.config().fetchAndActivate();
     *
     * if (activated) {
     *  console.log('Fetched values successfully activated.');
     * } else {
     *   console.log('Fetched values failed to activate.');
     * }
     * ```
     *
     */
    fetchAndActivate(): Promise<boolean>;

    /**
     * Returns all available config values.
     *
     * #### Example
     *
     * ```js
     * const values = firebase.config().getAll();
     *
     * Object.entries(values).forEach(($) => {
     *   const [key, entry] = $;
     *   console.log('Key: ', key);
     *   console.log('Source: ', entry.source);
     *   console.log('Value: ', entry.value);
     * });
     * ```
     *
     */
    getAll(): ConfigValues;

    /**
     * Gets a ConfigValue by key.
     *
     * #### Example
     *
     * ```js
     * const configValue = firebase.config().getValue('experiment');
     * console.log('Source: ', configValue.source);
     * console.log('Value: ', configValue.value);
     * ```
     *
     * @param key A key used to retrieve a specific value.
     */
    getValue(key: string): ConfigValue;

    /**
     * Set the Remote Config settings, specifically the `isDeveloperModeEnabled` flag.
     *
     * #### Example
     *
     * ```js
     * await firebase.config().setConfigSettings({
     *   isDeveloperModeEnabled: __DEV__,
     * });
     * ```
     *
     * @param configSettings A ConfigSettingsWrite instance used to set Remote Config settings.
     */
    setConfigSettings(configSettings: ConfigSettings): Promise<void>;

    /**
     * Sets default values for the app to use when accessing values.
     * Any data fetched and activated will override any default values. Any values in the defaults but not on Firebase will be untouched.
     *
     * #### Example
     *
     * ```js
     * await firebase.config().setDefaults({
     *   experiment_enabled: false,
     * });
     * ```
     *
     * @param defaults A ConfigDefaults instance used to set default values.
     */
    setDefaults(defaults: ConfigDefaults): Promise<null>;

    /**
     * Sets the default values from a resource file.
     * On iOS this is a plist file and on Android this is an XML defaultsMap file.
     *
     * ```js
     *  // TODO @ehesp
     * ```
     *
     * @param resourceName The plist/xml file name with no extension.
     */
    setDefaultsFromResource(resourceName: string): Promise<null>;
  }
}

declare module '@react-native-firebase/config' {
  import { ReactNativeFirebaseNamespace } from '@react-native-firebase/app-types';

  const FirebaseNamespaceExport: {} & ReactNativeFirebaseNamespace;

  /**
   * @example
   * ```js
   * import { firebase } from '@react-native-firebase/config';
   * firebase.config().X(...);
   * ```
   */
  export const firebase = FirebaseNamespaceExport;

  const ConfigDefaultExport: ReactNativeFirebaseModuleAndStatics<Config.Module, Config.Statics>;
  /**
   * @example
   * ```js
   * import config from '@react-native-firebase/config';
   * config().X(...);
   * ```
   */
  export default ConfigDefaultExport;
}

/**
 * Attach namespace to `firebase.` and `FirebaseApp.`.
 */
declare module '@react-native-firebase/app-types' {
  interface ReactNativeFirebaseNamespace {
    /**
     * Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your
     * app without requiring users to download an app update. When using Remote Config, you create in-app default
     * values that control the behavior and appearance of your app.
     */
    config: ReactNativeFirebaseModuleAndStatics<Config.Module, Config.Statics>;
  }

  interface FirebaseApp {
    /**
     * Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your
     * app without requiring users to download an app update. When using Remote Config, you create in-app default
     * values that control the behavior and appearance of your app.
     */
    config(): Config.Module;
  }
}
