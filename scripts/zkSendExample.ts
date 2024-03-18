import { ZkSendLinkBuilder } from '@mysten/zksend';
import getExecStuff from './execStuff';

async function zkSendExample() {

    const { keypair, client } = getExecStuff();

    const link = new ZkSendLinkBuilder({
        sender: '0xe65f125538ff216c12106adfa9004813bba39b5fd58f45f453fb1a866e89c800',
        redirect: {
            url: 'https://sdk.mystenlabs.com/zksend',
            name: 'zkSend',
        },
        client: client,
    });

    const txb = await link.createSendTransaction();
    await link.addClaimableBalance("0x2::sui::SUI", BigInt(1000000));

    // await link.create({
    //     signer: keypair,
    // });

    const { bytes, signature } = await txb.sign({ client, signer: keypair });

    const result = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
    });

    console.log({ result });

    console.log(link.getLink());
}

zkSendExample()
