window.addEventListener('web3sdk-ready', async _ => {
  //------------------------------------------------------------------//
  // Variables

  const networkName = document.getElementById('network').getAttribute('data-value')
  const network = Web3SDK.network(networkName)
  const metadata = network.contract('metadata')
  const loot = network.contract('loot')
  const game = network.contract('game')
  const dolla = network.contract('dolla')

  const template = {
    item: document.getElementById('template-item').innerHTML,
    price: document.getElementById('template-price').innerHTML,
    modal: document.getElementById('template-modal').innerHTML,
    attribute: document.getElementById('template-attribute').innerHTML
  }

  const zero = '0x0000000000000000000000000000000000000000'

  //------------------------------------------------------------------//
  // Functions 

  const toFixedNumber = function(number, length = 4) {
    const parts = number.toString().split('.')

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.')
  }

  const getRow = async _ => {
    const query = new URLSearchParams(window.location.search)
    for (const params of query) {
      if (params[0] === 'edition') {
        return await (await fetch(`/data/${networkName}/crew/${params[1]}.json`)).json()
      }
    }
  }

  const loadHead = async (row, stage) => {
    const head = document.querySelector('header.head a.cow')
    head.setAttribute('href', `./deets.html?edition=${row.edition}`)
    head.innerHTML = `<img src="/images/collection/${row.edition}_${stage}.png" />`
  }

  const loadLoot = async () => {
    const loots = await (await fetch(`/data/${networkName}/loot.json`)).json()
    
    for (let i = 0; i < loots.length; i++) {
      const loot = loots[i]
      const pricing = Web3SDK.state.character.loot[loot.edition]
      if (!Object.keys(pricing).length) {
        continue
      }
      
      const item = theme.toElement(template.item, {
        '{ID}': loot.edition,
        '{IMAGE}': `/images/loot/${loot.edition}.png`,
        '{NAME}': loot.name
      })
      document.getElementById(loot.category.toLowerCase()).append(item)
      window.doon(item)
    }
  }

  const write = async (contract, method, args, success, error) => {
    try {
      await contract.gas(Web3SDK.state.account, 0)[method](...args)
    } catch(e) {
      const pattern = /have (\d+) want (\d+)/
      const matches = e.message.match(pattern)
      if (matches && matches.length === 3) {
        e.message = e.message.replace(pattern, `have ${
          Web3SDK.toEther(matches[1], 'int').toFixed(5)
        } ETH want ${
          Web3SDK.toEther(matches[2], 'int').toFixed(5)
        } ETH`)
      }
      return error(e, e.message.replace('err: i', 'I'))
    }

    try {
      const confirmations = 2
      await contract.write(Web3SDK.state.account, 0, {
        hash: function(resolve, reject, hash) {
          notify(
           'success', 
           `Transaction started on <a href="${network.config.chain_scanner}/tx/${hash}" target="_blank">
             ${network.config.chain_scanner}
           </a>. Please stay on this page and wait for ${confirmations} confirmations...`,
           1000000
          )
        },
        confirmation: function(resolve, reject, confirmationNumber, receipt) {
          if (confirmationNumber > confirmations) return
          if (confirmationNumber == confirmations) {
           notify('success', `${confirmationNumber}/${confirmations} confirmed on <a href="${network.config.chain_scanner}/tx/${receipt.transactionHash}" target="_blank">
             ${network.config.chain_scanner}
           </a>.`)
           success()
           resolve()
           return
          }
          notify('success', `${confirmationNumber}/${confirmations} confirmed on <a href="${network.config.chain_scanner}/tx/${receipt.transactionHash}" target="_blank">
           ${network.config.chain_scanner}
          </a>. Please stay on this page and wait for ${confirmations} confirmations...`, 1000000)
        },
        receipt: function(resolve, reject, receipt) {
          notify(
           'success', 
           `Confirming on <a href="${network.config.chain_scanner}/tx/${receipt.transactionHash}" target="_blank">
             ${network.config.chain_scanner}
           </a>. Please stay on this page and wait for ${confirmations} confirmations...`,
           1000000
          )
        }
      })[method](...args)
    } catch(e) {
      return error(e, e.message.replace('err: i', 'I'))
    }
  }

  //------------------------------------------------------------------//
  // Events

  window.addEventListener('web3sdk-connected', async _ => {
    const row = await getRow()
    if (!row) window.location.href = './cows.html'
    Web3SDK.state.character = row
    const stage = parseInt(await metadata.read().stage(row.edition))
    await loadHead(row, stage)
    await loadLoot()
  })

  window.addEventListener('web3sdk-disconnected',  async _ => {
    window.location.href = './members.html'
  })

  window.addEventListener('tab-click',  async e => {
    theme.hide('div.category', true)
    theme.hide(e.for.getAttribute('data-target'), false)

    theme.toggle('nav.tabs a', 'btn-pixel-warning', false)
    theme.toggle(e.for, 'btn-pixel-warning', true)
  })

  window.addEventListener('modal-open-click', async (e) => {
    const id = parseInt(e.for.getAttribute('data-id'))

    const loot = await (await fetch(
      `/data/${networkName}/loot/${String(id).padStart(64, '0')}.json`
    )).json()
    const pricing = Web3SDK.state.character.loot[loot.edition]
    const prices = [ 
      ['dolla', pricing[dolla.address]?.price || '0'], 
      ['eth', pricing[zero]?.price || '0'] 
    ]
    .filter(amount => amount[1] != 0)
    .map(amount => template.price
      .replace('{ID}', id)
      .replace('{CURRENCY}', amount[0])
      .replace('{CURRENCY}', amount[0])
      .replace('{PRICE}', toFixedNumber(Web3SDK.toEther(
        amount[1], 
        'string'
      )))
    )

    const boxes = []
    for (const trait of loot.attributes) {
      boxes.push(template.attribute
        .replace('{NAME}', trait.trait_name)
        .replace('{VALUE}', trait.value)
      )
    }

    const item = theme.toElement(template.modal, {
      '{ID}': loot.edition,
      '{IMAGE}': `/images/loot/${loot.edition}.png`,
      '{NAME}': loot.name,
      '{PRICE}': prices.join(''),
      '{ATTRIBUTES}': boxes.join('')
    })
    document.body.appendChild(item)
    window.doon(item)
  })

  window.addEventListener('modal-close-click', () => {
    document.body.removeChild(document.querySelector('div.modal'))
  })

  window.addEventListener('mint-click', async e => {
    const id = e.for.getAttribute('data-id')
    const currency = e.for.getAttribute('data-currency')
    const address = currency === 'eth' ? zero : dolla.address
    const offer = Web3SDK.state.character.loot[id][address]
    console.log(offer)

    const method = currency == 'eth'
      //characterId, itemId, price, proof
      ? 'mint(uint256,uint256,uint256,bytes)'
      //token address, characterId, itemId, price, proof
      : 'mint(address,uint256,uint256,uint256,bytes)'

    const args = currency == 'eth' 
      ? [
        Web3SDK.state.character.characterId,
        id,
        offer.price,
        offer.proof
      ]: [
        dolla.address,
        Web3SDK.state.character.characterId,
        id,
        offer.price,
        offer.proof
      ]

    console.log(method, args)

    await write(game, method, args, () => {
      window.location.reload()
    }, (e) => {
      notify('error', e.message)
    })

  })

  //------------------------------------------------------------------//
  // Initialize
})