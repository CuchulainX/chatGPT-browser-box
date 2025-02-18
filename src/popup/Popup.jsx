import '@picocss/pico'
import { useEffect, useState } from 'react'
import {
  defaultConfig,
  getPreferredLanguageKey,
  getUserConfig,
<<<<<<< HEAD
  isUsingApiKey,
  isUsingCustomModel,
  isUsingMultiModeModel,
  ModelMode,
  Models,
  setUserConfig,
  ThemeMode,
  TriggerMode,
=======
  setUserConfig,
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
} from '../config/index.mjs'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './styles.scss'
import { MarkGithubIcon } from '@primer/octicons-react'
import Browser from 'webextension-polyfill'
<<<<<<< HEAD
import PropTypes from 'prop-types'
import { config as toolsConfig } from '../content-script/selection-tools'
import wechatpay from './donation/wechatpay.jpg'
import bugmeacoffee from './donation/bugmeacoffee.png'
import { useWindowTheme } from '../hooks/use-window-theme.mjs'
import { languageList } from '../config/language.mjs'
import { isSafari } from '../utils/index.mjs'
import { useTranslation } from 'react-i18next'

function GeneralPart({ config, updateConfig }) {
  const { t, i18n } = useTranslation()
  const [balance, setBalance] = useState(null)

  const getBalance = async () => {
    const response = await fetch('https://api.openai.com/dashboard/billing/credit_grants', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
    })
    if (response.ok) setBalance((await response.json()).total_available.toFixed(2))
  }

  return (
    <>
      <label>
        <legend>{t('Triggers')}</legend>
        <select
          required
          onChange={(e) => {
            const mode = e.target.value
            updateConfig({ triggerMode: mode })
          }}
        >
          {Object.entries(TriggerMode).map(([key, desc]) => {
            return (
              <option value={key} key={key} selected={key === config.triggerMode}>
                {t(desc)}
              </option>
            )
          })}
        </select>
      </label>
      <label>
        <legend>{t('Theme')}</legend>
        <select
          required
          onChange={(e) => {
            const mode = e.target.value
            updateConfig({ themeMode: mode })
          }}
        >
          {Object.entries(ThemeMode).map(([key, desc]) => {
            return (
              <option value={key} key={key} selected={key === config.themeMode}>
                {t(desc)}
              </option>
            )
          })}
        </select>
      </label>
      <label>
        <legend>{t('API Mode')}</legend>
        <span style="display: flex; gap: 15px;">
          <select
            style={
              isUsingApiKey(config) || isUsingMultiModeModel(config) || isUsingCustomModel(config)
                ? 'width: 50%;'
                : undefined
            }
            required
            onChange={(e) => {
              const modelName = e.target.value
              updateConfig({ modelName: modelName })
            }}
          >
            {Object.entries(Models).map(([key, model]) => {
              return (
                <option value={key} key={key} selected={key === config.modelName}>
                  {t(model.desc)}
                </option>
              )
            })}
          </select>
          {isUsingMultiModeModel(config) && (
            <select
              style="width: 50%;"
              required
              onChange={(e) => {
                const modelMode = e.target.value
                updateConfig({ modelMode: modelMode })
              }}
            >
              {Object.entries(ModelMode).map(([key, desc]) => {
                return (
                  <option value={key} key={key} selected={key === config.modelMode}>
                    {t(desc)}
                  </option>
                )
              })}
            </select>
          )}
          {isUsingApiKey(config) && (
            <span style="width: 50%; display: flex; gap: 5px;">
              <input
                type="password"
                value={config.apiKey}
                placeholder={t('API Key')}
                onChange={(e) => {
                  const apiKey = e.target.value
                  updateConfig({ apiKey: apiKey })
                }}
              />
              {config.apiKey.length === 0 ? (
                <a
                  href="https://platform.openai.com/account/api-keys"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <button style="white-space: nowrap;" type="button">
                    {t('Get')}
                  </button>
                </a>
              ) : balance ? (
                <button type="button" onClick={getBalance}>
                  {balance}
                </button>
              ) : (
                <button type="button" onClick={getBalance}>
                  {t('Balance')}
                </button>
              )}
            </span>
          )}
          {isUsingCustomModel(config) && (
            <input
              style="width: 50%;"
              type="text"
              value={config.customModelName}
              placeholder={t('Model Name')}
              onChange={(e) => {
                const customModelName = e.target.value
                updateConfig({ customModelName: customModelName })
              }}
            />
          )}
        </span>
        {isUsingCustomModel(config) && (
          <input
            type="text"
            value={config.customModelApiUrl}
            placeholder={t('Custom Model API Url')}
            onChange={(e) => {
              const value = e.target.value
              updateConfig({ customModelApiUrl: value })
            }}
          />
        )}
      </label>
      <label>
        <legend>{t('Preferred Language')}</legend>
        <select
          required
          onChange={(e) => {
            const preferredLanguageKey = e.target.value
            updateConfig({ preferredLanguage: preferredLanguageKey })

            let lang
            if (preferredLanguageKey === 'auto') lang = config.userLanguage
            else lang = preferredLanguageKey
            i18n.changeLanguage(lang)

            Browser.tabs.query({}).then((tabs) => {
              tabs.forEach((tab) => {
                Browser.tabs
                  .sendMessage(tab.id, {
                    type: 'CHANGE_LANG',
                    data: {
                      lang,
                    },
                  })
                  .catch(() => ({}))
              })
            })
          }}
        >
          {Object.entries(languageList).map(([k, v]) => {
            return (
              <option value={k} key={k} selected={k === config.preferredLanguage}>
                {v.native}
              </option>
            )
          })}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={config.insertAtTop}
          onChange={(e) => {
            const checked = e.target.checked
            updateConfig({ insertAtTop: checked })
          }}
        />
        {t('Insert ChatGPT at the top of search results')}
      </label>
      <label>
        <input
          type="checkbox"
          checked={config.lockWhenAnswer}
          onChange={(e) => {
            const checked = e.target.checked
            updateConfig({ lockWhenAnswer: checked })
          }}
        />
        {t('Lock scrollbar while answering')}
      </label>
      <br />
    </>
  )
}

GeneralPart.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
}

function AdvancedPart({ config, updateConfig }) {
  const { t } = useTranslation()

  return (
    <>
      <label>
        {t('Custom ChatGPT Web API Url')}
        <input
          type="text"
          value={config.customChatGptWebApiUrl}
          onChange={(e) => {
            const value = e.target.value
            updateConfig({ customChatGptWebApiUrl: value })
          }}
        />
      </label>
      <label>
        {t('Custom ChatGPT Web API Path')}
        <input
          type="text"
          value={config.customChatGptWebApiPath}
          onChange={(e) => {
            const value = e.target.value
            updateConfig({ customChatGptWebApiPath: value })
          }}
        />
      </label>
      <label>
        {t('Custom OpenAI API Url')}
        <input
          type="text"
          value={config.customOpenAiApiUrl}
          onChange={(e) => {
            const value = e.target.value
            updateConfig({ customOpenAiApiUrl: value })
          }}
        />
      </label>
      <label>
        {t('Custom Site Regex')}
        <input
          type="text"
          value={config.siteRegex}
          onChange={(e) => {
            const regex = e.target.value
            updateConfig({ siteRegex: regex })
          }}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={config.userSiteRegexOnly}
          onChange={(e) => {
            const checked = e.target.checked
            updateConfig({ userSiteRegexOnly: checked })
          }}
        />
        {t('Exclusively use Custom Site Regex for website matching, ignoring built-in rules')}
      </label>
      <br />
      <label>
        {t('Input Query')}
        <input
          type="text"
          value={config.inputQuery}
          onChange={(e) => {
            const query = e.target.value
            updateConfig({ inputQuery: query })
          }}
        />
      </label>
      <label>
        {t('Append Query')}
        <input
          type="text"
          value={config.appendQuery}
          onChange={(e) => {
            const query = e.target.value
            updateConfig({ appendQuery: query })
          }}
        />
      </label>
      <label>
        {t('Prepend Query')}
        <input
          type="text"
          value={config.prependQuery}
          onChange={(e) => {
            const query = e.target.value
            updateConfig({ prependQuery: query })
          }}
        />
      </label>
    </>
  )
}

AdvancedPart.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
}

function SelectionTools({ config, updateConfig }) {
  const { t } = useTranslation()

  return (
    <>
      {config.selectionTools.map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={config.activeSelectionTools.includes(key)}
            onChange={(e) => {
              const checked = e.target.checked
              const activeSelectionTools = config.activeSelectionTools.filter((i) => i !== key)
              if (checked) activeSelectionTools.push(key)
              updateConfig({ activeSelectionTools })
            }}
          />
          {t(toolsConfig[key].label)}
        </label>
      ))}
    </>
  )
}

SelectionTools.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
}

function SiteAdapters({ config, updateConfig }) {
  return (
    <>
      {config.siteAdapters.map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={config.activeSiteAdapters.includes(key)}
            onChange={(e) => {
              const checked = e.target.checked
              const activeSiteAdapters = config.activeSiteAdapters.filter((i) => i !== key)
              if (checked) activeSiteAdapters.push(key)
              updateConfig({ activeSiteAdapters })
            }}
          />
          {key}
        </label>
      ))}
    </>
  )
}

SiteAdapters.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
}

function Donation() {
  const { t } = useTranslation()

  return (
    <div style="display:flex;flex-direction:column;align-items:center;">
      <a
        href="https://www.buymeacoffee.com/josStorer"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <img alt="buymeacoffee" src={bugmeacoffee} />
      </a>
      <br />
      <>
        {t('Wechat Pay')}
        <img alt="wechatpay" src={wechatpay} />
      </>
    </div>
  )
}
=======
import { useWindowTheme } from '../hooks/use-window-theme.mjs'
import { isMobile } from '../utils/index.mjs'
import { useTranslation } from 'react-i18next'
import { GeneralPart } from './sections/GeneralPart'
import { FeaturePages } from './sections/FeaturePages'
import { AdvancedPart } from './sections/AdvancedPart'
import { ModulesPart } from './sections/ModulesPart'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

// eslint-disable-next-line react/prop-types
function Footer({ currentVersion, latestVersion }) {
  const { t } = useTranslation()

  return (
    <div className="footer">
      <div>
        {`${t('Current Version')}: ${currentVersion} `}
<<<<<<< HEAD
        {currentVersion === latestVersion ? (
=======
        {currentVersion >= latestVersion ? (
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
          `(${t('Latest')})`
        ) : (
          <>
            ({`${t('Latest')}: `}
            <a
              href={'https://github.com/josStorer/chatGPTBox/releases/tag/v' + latestVersion}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {latestVersion}
            </a>
            )
          </>
        )}
      </div>
      <div>
        <a
          href="https://github.com/josStorer/chatGPTBox"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <span>{t('Help | Changelog ')}</span>
          <MarkGithubIcon />
        </a>
      </div>
    </div>
  )
}

function Popup() {
  const { t, i18n } = useTranslation()
  const [config, setConfig] = useState(defaultConfig)
  const [currentVersion, setCurrentVersion] = useState('')
  const [latestVersion, setLatestVersion] = useState('')
  const theme = useWindowTheme()

  const updateConfig = (value) => {
    setConfig({ ...config, ...value })
    setUserConfig(value)
  }

  useEffect(() => {
    getPreferredLanguageKey().then((lang) => {
      i18n.changeLanguage(lang)
    })
    getUserConfig().then((config) => {
      setConfig(config)
      setCurrentVersion(Browser.runtime.getManifest().version.replace('v', ''))
      fetch('https://api.github.com/repos/josstorer/chatGPTBox/releases/latest').then((response) =>
        response.json().then((data) => {
          setLatestVersion(data.tag_name.replace('v', ''))
        }),
      )
    })
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = config.themeMode === 'auto' ? theme : config.themeMode
  }, [config.themeMode, theme])

  const search = new URLSearchParams(window.location.search)
<<<<<<< HEAD
  const popup = search.get('popup') // manifest v2
=======
  const popup = !isMobile() && search.get('popup') // manifest v2
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

  return (
    <div className={popup === 'true' ? 'container-popup-mode' : 'container-page-mode'}>
      <form style="width:100%;">
        <Tabs selectedTabClassName="popup-tab--selected">
          <TabList>
            <Tab className="popup-tab">{t('General')}</Tab>
<<<<<<< HEAD
            <Tab className="popup-tab">{t('Selection Tools')}</Tab>
            <Tab className="popup-tab">{t('Sites')}</Tab>
            <Tab className="popup-tab">{t('Advanced')}</Tab>
            {isSafari() ? null : <Tab className="popup-tab">{t('Donate')}</Tab>}
=======
            <Tab className="popup-tab">{t('Feature Pages')}</Tab>
            <Tab className="popup-tab">{t('Modules')}</Tab>
            <Tab className="popup-tab">{t('Advanced')}</Tab>
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
          </TabList>

          <TabPanel>
            <GeneralPart config={config} updateConfig={updateConfig} />
          </TabPanel>
          <TabPanel>
            <FeaturePages config={config} updateConfig={updateConfig} />
          </TabPanel>
          <TabPanel>
            <ModulesPart config={config} updateConfig={updateConfig} />
          </TabPanel>
          <TabPanel>
            <AdvancedPart config={config} updateConfig={updateConfig} />
          </TabPanel>
<<<<<<< HEAD
          {isSafari() ? null : (
            <TabPanel>
              <Donation />
            </TabPanel>
          )}
=======
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
        </Tabs>
      </form>
      <br />
      <Footer currentVersion={currentVersion} latestVersion={latestVersion} />
    </div>
  )
}

export default Popup
