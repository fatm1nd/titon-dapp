import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    const _minter = sc_0.loadAddress();
    const _item_id = sc_0.loadIntBig(257);
    const _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    const _minter = source.readAddress();
    const _item_id = source.readBigNumber();
    const _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadGetterTupleLogEventMintRecord(source: TupleReader) {
    const _minter = source.readAddress();
    const _item_id = source.readBigNumber();
    const _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type CreateEvent = {
    $$type: 'CreateEvent';
    owner_address: Address;
    collection_content: Cell;
    ticketContent: Cell;
    ticketCost: bigint;
    guardAddress: Address;
    tickets_amount: bigint;
    start_sale_time: bigint;
    end_sale_time: bigint;
    start_event_time: bigint;
    end_event_time: bigint;
}

export function storeCreateEvent(src: CreateEvent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3286026747, 32);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        b_0.storeRef(src.ticketContent);
        b_0.storeInt(src.ticketCost, 257);
        b_0.storeAddress(src.guardAddress);
        const b_1 = new Builder();
        b_1.storeInt(src.tickets_amount, 257);
        b_1.storeInt(src.start_sale_time, 257);
        b_1.storeInt(src.end_sale_time, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.start_event_time, 257);
        b_2.storeInt(src.end_event_time, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateEvent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3286026747) { throw Error('Invalid prefix'); }
    const _owner_address = sc_0.loadAddress();
    const _collection_content = sc_0.loadRef();
    const _ticketContent = sc_0.loadRef();
    const _ticketCost = sc_0.loadIntBig(257);
    const _guardAddress = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _tickets_amount = sc_1.loadIntBig(257);
    const _start_sale_time = sc_1.loadIntBig(257);
    const _end_sale_time = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _start_event_time = sc_2.loadIntBig(257);
    const _end_event_time = sc_2.loadIntBig(257);
    return { $$type: 'CreateEvent' as const, owner_address: _owner_address, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function loadTupleCreateEvent(source: TupleReader) {
    const _owner_address = source.readAddress();
    const _collection_content = source.readCell();
    const _ticketContent = source.readCell();
    const _ticketCost = source.readBigNumber();
    const _guardAddress = source.readAddress();
    const _tickets_amount = source.readBigNumber();
    const _start_sale_time = source.readBigNumber();
    const _end_sale_time = source.readBigNumber();
    const _start_event_time = source.readBigNumber();
    const _end_event_time = source.readBigNumber();
    return { $$type: 'CreateEvent' as const, owner_address: _owner_address, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function loadGetterTupleCreateEvent(source: TupleReader) {
    const _owner_address = source.readAddress();
    const _collection_content = source.readCell();
    const _ticketContent = source.readCell();
    const _ticketCost = source.readBigNumber();
    const _guardAddress = source.readAddress();
    const _tickets_amount = source.readBigNumber();
    const _start_sale_time = source.readBigNumber();
    const _end_sale_time = source.readBigNumber();
    const _start_event_time = source.readBigNumber();
    const _end_event_time = source.readBigNumber();
    return { $$type: 'CreateEvent' as const, owner_address: _owner_address, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function storeTupleCreateEvent(source: CreateEvent) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.collection_content);
    builder.writeCell(source.ticketContent);
    builder.writeNumber(source.ticketCost);
    builder.writeAddress(source.guardAddress);
    builder.writeNumber(source.tickets_amount);
    builder.writeNumber(source.start_sale_time);
    builder.writeNumber(source.end_sale_time);
    builder.writeNumber(source.start_event_time);
    builder.writeNumber(source.end_event_time);
    return builder.build();
}

function dictValueParserCreateEvent(): DictionaryValue<CreateEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCreateEvent(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _numerator = sc_0.loadUintBig(16);
    const _denominator = sc_0.loadUintBig(16);
    const _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _next_item_index = sc_0.loadIntBig(257);
    const _collection_content = sc_0.loadRef();
    const _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    const _next_item_index = source.readBigNumber();
    const _collection_content = source.readCell();
    const _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    const _next_item_index = source.readBigNumber();
    const _collection_content = source.readCell();
    const _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    const _numerator = sc_0.loadIntBig(257);
    const _denominator = sc_0.loadIntBig(257);
    const _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _new_owner = sc_0.loadAddress();
    const _response_destination = sc_0.loadMaybeAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forward_amount = sc_0.loadCoins();
    const _forward_payload = sc_0;
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _new_owner = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _custom_payload = source.readCellOpt();
    const _forward_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransfer(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _new_owner = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _custom_payload = source.readCellOpt();
    const _forward_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Slice;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _prev_owner = sc_0.loadAddress();
    const _forward_payload = sc_0;
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _prev_owner = source.readAddress();
    const _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _prev_owner = source.readAddress();
    const _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    const _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _index_id = sc_0.loadIntBig(257);
    const _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _index_id = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _index_id = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell | null;
    punched: boolean;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_0.storeBit(true).storeRef(src.individual_content); } else { b_0.storeBit(false); }
        b_0.storeBit(src.punched);
    };
}

export function loadGetNftData(slice: Slice) {
    const sc_0 = slice;
    const _is_initialized = sc_0.loadBit();
    const _index = sc_0.loadIntBig(257);
    const _collection_address = sc_0.loadAddress();
    const _owner_address = sc_0.loadAddress();
    const _individual_content = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _punched = sc_0.loadBit();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content, punched: _punched };
}

function loadTupleGetNftData(source: TupleReader) {
    const _is_initialized = source.readBoolean();
    const _index = source.readBigNumber();
    const _collection_address = source.readAddress();
    const _owner_address = source.readAddress();
    const _individual_content = source.readCellOpt();
    const _punched = source.readBoolean();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content, punched: _punched };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    const _is_initialized = source.readBoolean();
    const _index = source.readBigNumber();
    const _collection_address = source.readAddress();
    const _owner_address = source.readAddress();
    const _individual_content = source.readCellOpt();
    const _punched = source.readBoolean();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content, punched: _punched };
}

function storeTupleGetNftData(source: GetNftData) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    builder.writeBoolean(source.punched);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type EntranceGuard = {
    $$type: 'EntranceGuard';
    guardAddress: Address;
}

export function storeEntranceGuard(src: EntranceGuard) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(505706633, 32);
        b_0.storeAddress(src.guardAddress);
    };
}

export function loadEntranceGuard(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 505706633) { throw Error('Invalid prefix'); }
    const _guardAddress = sc_0.loadAddress();
    return { $$type: 'EntranceGuard' as const, guardAddress: _guardAddress };
}

function loadTupleEntranceGuard(source: TupleReader) {
    const _guardAddress = source.readAddress();
    return { $$type: 'EntranceGuard' as const, guardAddress: _guardAddress };
}

function loadGetterTupleEntranceGuard(source: TupleReader) {
    const _guardAddress = source.readAddress();
    return { $$type: 'EntranceGuard' as const, guardAddress: _guardAddress };
}

function storeTupleEntranceGuard(source: EntranceGuard) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.guardAddress);
    return builder.build();
}

function dictValueParserEntranceGuard(): DictionaryValue<EntranceGuard> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEntranceGuard(src)).endCell());
        },
        parse: (src) => {
            return loadEntranceGuard(src.loadRef().beginParse());
        }
    }
}

export type TicketDataForPunch = {
    $$type: 'TicketDataForPunch';
    visitor: Address;
    index: bigint;
}

export function storeTicketDataForPunch(src: TicketDataForPunch) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1423377832, 32);
        b_0.storeAddress(src.visitor);
        b_0.storeInt(src.index, 257);
    };
}

export function loadTicketDataForPunch(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1423377832) { throw Error('Invalid prefix'); }
    const _visitor = sc_0.loadAddress();
    const _index = sc_0.loadIntBig(257);
    return { $$type: 'TicketDataForPunch' as const, visitor: _visitor, index: _index };
}

function loadTupleTicketDataForPunch(source: TupleReader) {
    const _visitor = source.readAddress();
    const _index = source.readBigNumber();
    return { $$type: 'TicketDataForPunch' as const, visitor: _visitor, index: _index };
}

function loadGetterTupleTicketDataForPunch(source: TupleReader) {
    const _visitor = source.readAddress();
    const _index = source.readBigNumber();
    return { $$type: 'TicketDataForPunch' as const, visitor: _visitor, index: _index };
}

function storeTupleTicketDataForPunch(source: TicketDataForPunch) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.visitor);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserTicketDataForPunch(): DictionaryValue<TicketDataForPunch> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTicketDataForPunch(src)).endCell());
        },
        parse: (src) => {
            return loadTicketDataForPunch(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type EventFactory$Data = {
    $$type: 'EventFactory$Data';
    factory_owner: Address;
}

export function storeEventFactory$Data(src: EventFactory$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.factory_owner);
    };
}

export function loadEventFactory$Data(slice: Slice) {
    const sc_0 = slice;
    const _factory_owner = sc_0.loadAddress();
    return { $$type: 'EventFactory$Data' as const, factory_owner: _factory_owner };
}

function loadTupleEventFactory$Data(source: TupleReader) {
    const _factory_owner = source.readAddress();
    return { $$type: 'EventFactory$Data' as const, factory_owner: _factory_owner };
}

function loadGetterTupleEventFactory$Data(source: TupleReader) {
    const _factory_owner = source.readAddress();
    return { $$type: 'EventFactory$Data' as const, factory_owner: _factory_owner };
}

function storeTupleEventFactory$Data(source: EventFactory$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.factory_owner);
    return builder.build();
}

function dictValueParserEventFactory$Data(): DictionaryValue<EventFactory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEventFactory$Data(src.loadRef().beginParse());
        }
    }
}

export type Event$Data = {
    $$type: 'Event$Data';
    next_item_index: bigint;
    owner_address: Address;
    royalty_params: RoyaltyParams | null;
    collection_content: Cell;
    ticketContent: Cell;
    ticketCost: bigint;
    guardAddress: Address;
    tickets_amount: bigint;
    start_sale_time: bigint;
    end_sale_time: bigint;
    start_event_time: bigint;
    end_event_time: bigint;
}

export function storeEvent$Data(src: Event$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.next_item_index, 32);
        b_0.storeAddress(src.owner_address);
        const b_1 = new Builder();
        if (src.royalty_params !== null && src.royalty_params !== undefined) { b_1.storeBit(true); b_1.store(storeRoyaltyParams(src.royalty_params)); } else { b_1.storeBit(false); }
        b_1.storeRef(src.collection_content);
        b_1.storeRef(src.ticketContent);
        const b_2 = new Builder();
        b_2.storeInt(src.ticketCost, 257);
        b_2.storeAddress(src.guardAddress);
        b_2.storeInt(src.tickets_amount, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.start_sale_time, 257);
        b_3.storeInt(src.end_sale_time, 257);
        b_3.storeInt(src.start_event_time, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.end_event_time, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEvent$Data(slice: Slice) {
    const sc_0 = slice;
    const _next_item_index = sc_0.loadUintBig(32);
    const _owner_address = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _royalty_params = sc_1.loadBit() ? loadRoyaltyParams(sc_1) : null;
    const _collection_content = sc_1.loadRef();
    const _ticketContent = sc_1.loadRef();
    const sc_2 = sc_1.loadRef().beginParse();
    const _ticketCost = sc_2.loadIntBig(257);
    const _guardAddress = sc_2.loadAddress();
    const _tickets_amount = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _start_sale_time = sc_3.loadIntBig(257);
    const _end_sale_time = sc_3.loadIntBig(257);
    const _start_event_time = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _end_event_time = sc_4.loadIntBig(257);
    return { $$type: 'Event$Data' as const, next_item_index: _next_item_index, owner_address: _owner_address, royalty_params: _royalty_params, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function loadTupleEvent$Data(source: TupleReader) {
    const _next_item_index = source.readBigNumber();
    const _owner_address = source.readAddress();
    const _royalty_params_p = source.readTupleOpt();
    const _royalty_params = _royalty_params_p ? loadTupleRoyaltyParams(_royalty_params_p) : null;
    const _collection_content = source.readCell();
    const _ticketContent = source.readCell();
    const _ticketCost = source.readBigNumber();
    const _guardAddress = source.readAddress();
    const _tickets_amount = source.readBigNumber();
    const _start_sale_time = source.readBigNumber();
    const _end_sale_time = source.readBigNumber();
    const _start_event_time = source.readBigNumber();
    const _end_event_time = source.readBigNumber();
    return { $$type: 'Event$Data' as const, next_item_index: _next_item_index, owner_address: _owner_address, royalty_params: _royalty_params, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function loadGetterTupleEvent$Data(source: TupleReader) {
    const _next_item_index = source.readBigNumber();
    const _owner_address = source.readAddress();
    const _royalty_params_p = source.readTupleOpt();
    const _royalty_params = _royalty_params_p ? loadTupleRoyaltyParams(_royalty_params_p) : null;
    const _collection_content = source.readCell();
    const _ticketContent = source.readCell();
    const _ticketCost = source.readBigNumber();
    const _guardAddress = source.readAddress();
    const _tickets_amount = source.readBigNumber();
    const _start_sale_time = source.readBigNumber();
    const _end_sale_time = source.readBigNumber();
    const _start_event_time = source.readBigNumber();
    const _end_event_time = source.readBigNumber();
    return { $$type: 'Event$Data' as const, next_item_index: _next_item_index, owner_address: _owner_address, royalty_params: _royalty_params, collection_content: _collection_content, ticketContent: _ticketContent, ticketCost: _ticketCost, guardAddress: _guardAddress, tickets_amount: _tickets_amount, start_sale_time: _start_sale_time, end_sale_time: _end_sale_time, start_event_time: _start_event_time, end_event_time: _end_event_time };
}

function storeTupleEvent$Data(source: Event$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeAddress(source.owner_address);
    if (source.royalty_params !== null && source.royalty_params !== undefined) {
        builder.writeTuple(storeTupleRoyaltyParams(source.royalty_params));
    } else {
        builder.writeTuple(null);
    }
    builder.writeCell(source.collection_content);
    builder.writeCell(source.ticketContent);
    builder.writeNumber(source.ticketCost);
    builder.writeAddress(source.guardAddress);
    builder.writeNumber(source.tickets_amount);
    builder.writeNumber(source.start_sale_time);
    builder.writeNumber(source.end_sale_time);
    builder.writeNumber(source.start_event_time);
    builder.writeNumber(source.end_event_time);
    return builder.build();
}

function dictValueParserEvent$Data(): DictionaryValue<Event$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvent$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEvent$Data(src.loadRef().beginParse());
        }
    }
}

export type Ticket$Data = {
    $$type: 'Ticket$Data';
    collection_address: Address;
    item_index: bigint;
    is_initialized: boolean;
    punched: boolean;
    owner: Address | null;
    individual_content: Cell | null;
}

export function storeTicket$Data(src: Ticket$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeBit(src.is_initialized);
        b_0.storeBit(src.punched);
        b_0.storeAddress(src.owner);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_0.storeBit(true).storeRef(src.individual_content); } else { b_0.storeBit(false); }
    };
}

export function loadTicket$Data(slice: Slice) {
    const sc_0 = slice;
    const _collection_address = sc_0.loadAddress();
    const _item_index = sc_0.loadIntBig(257);
    const _is_initialized = sc_0.loadBit();
    const _punched = sc_0.loadBit();
    const _owner = sc_0.loadMaybeAddress();
    const _individual_content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Ticket$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, punched: _punched, owner: _owner, individual_content: _individual_content };
}

function loadTupleTicket$Data(source: TupleReader) {
    const _collection_address = source.readAddress();
    const _item_index = source.readBigNumber();
    const _is_initialized = source.readBoolean();
    const _punched = source.readBoolean();
    const _owner = source.readAddressOpt();
    const _individual_content = source.readCellOpt();
    return { $$type: 'Ticket$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, punched: _punched, owner: _owner, individual_content: _individual_content };
}

function loadGetterTupleTicket$Data(source: TupleReader) {
    const _collection_address = source.readAddress();
    const _item_index = source.readBigNumber();
    const _is_initialized = source.readBoolean();
    const _punched = source.readBoolean();
    const _owner = source.readAddressOpt();
    const _individual_content = source.readCellOpt();
    return { $$type: 'Ticket$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, punched: _punched, owner: _owner, individual_content: _individual_content };
}

function storeTupleTicket$Data(source: Ticket$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeBoolean(source.is_initialized);
    builder.writeBoolean(source.punched);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserTicket$Data(): DictionaryValue<Ticket$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTicket$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTicket$Data(src.loadRef().beginParse());
        }
    }
}

 type Event_init_args = {
    $$type: 'Event_init_args';
    owner_address: Address;
    collection_content: Cell;
    ticketContent: Cell;
    ticketCost: bigint;
    guardAddress: Address;
    tickets_amount: bigint;
    start_sale_time: bigint;
    end_sale_time: bigint;
    start_event_time: bigint;
    end_event_time: bigint;
}

function initEvent_init_args(src: Event_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.collection_content);
        const b_1 = new Builder();
        b_1.storeRef(src.ticketContent);
        b_1.storeInt(src.ticketCost, 257);
        b_1.storeAddress(src.guardAddress);
        b_1.storeInt(src.tickets_amount, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.start_sale_time, 257);
        b_2.storeInt(src.end_sale_time, 257);
        b_2.storeInt(src.start_event_time, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.end_event_time, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Event_init(owner_address: Address, collection_content: Cell, ticketContent: Cell, ticketCost: bigint, guardAddress: Address, tickets_amount: bigint, start_sale_time: bigint, end_sale_time: bigint, start_event_time: bigint, end_event_time: bigint) {
    const __code = Cell.fromHex('b5ee9c7241023501000cfe000228ff008e88f4a413f4bcf2c80bed5320e303ed43d90115020271020a02012003080201200407029fb56bbda89a1a400031c7bf481a9a803a1a9020203ae01f481020203ae01a861a1020203ae01020203ae01020203ae01a861a1020203ae00602114211215a2aa10e01412da12aac3c61aaa37b678d98301605013e31c86f00016f8c6d6f8c01d0db3c6f2201c993216eb396016f2259ccc9e8310600ba20d74a21d7499720c20022c200b18e4a036f22807f22cf31ab02a105ab025155b60820c2009c20aa0215d7185033cf164014de596f025341a1c20099c8016f025044a1aa028e123133c20099d430d020d74a21d749927020e2e2e85f03029fb796dda89a1a400031c7bf481a9a803a1a9020203ae01f481020203ae01a861a1020203ae01020203ae01020203ae01a861a1020203ae00602114211215a2aa10e01412da12aac3c61aaa17b678d98501626029fba7a3ed44d0d200018e3dfa40d4d401d0d4810101d700fa40810101d700d430d0810101d700810101d700810101d700d430d0810101d70030108a10890ad15508700a096d095561e30d550bdb3c6cc181609015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0260201200b130201200c110201580d0f029bac2df6a268690000c71efd206a6a00e86a408080eb807d20408080eb806a1868408080eb80408080eb80408080eb806a1868408080eb8018084508448568aa84380504b684aab0f186ed9e3661c0160e0006547b8a029bafe1f6a268690000c71efd206a6a00e86a408080eb807d20408080eb806a1868408080eb80408080eb80408080eb806a1868408080eb8018084508448568aa84380504b684aab0f186ed9e3660c01610000220029bb43e7da89a1a400031c7bf481a9a803a1a9020203ae01f481020203ae01a861a1020203ae01020203ae01020203ae01a861a1020203ae00602114211215a2aa10e01412da12aac3c61bb678d98301612000224029bb9ed8ed44d0d200018e3dfa40d4d401d0d4810101d700fa40810101d700d430d0810101d700810101d700810101d700d430d0810101d70030108a10890ad15508700a096d095561e30ddb3c6cc18161400022103e630eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e3dfa40d4d401d0d4810101d700fa40810101d700d430d0810101d700810101d700810101d700d430d0810101d70030108a10890ad15508700a096d095561e30d0d925f0de02bd749c21fe3000bf9012016171f00a4d31ffa40d401d0d200018e10810101d700810101d700fa4055206f03916de201d4d4d430d0810101d700fa40810101d700d430d0810101d700810101d700810101d700d430d0810101d7003010ac10ab6c1c03880bd31f21821054d705a8bae3022182101e247889ba8ea1313403fa400131816e7cf84252a0c705f2f4109b108a1079106810571046443512e0018210946a98b6bae3020b181e1c04f831fa40810101d700596c21817260f8425260c705f2f410ac109b108a10791068105710461035443012db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d088820898968072036d6d5a7fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a26191a1b00280000000050756e636820746865207469636b657400065bcf8102108ae2f400c901fb00231e0258d33f0131c8018210aff90f5758cb1fcb3fc910ac109b108a10791068105710461035443012f84201706ddb3c1d1e00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0000f4c87f01ca0055b050bccb1f5009cf16c8286eb38e1d7f01ca0008206ef2d0806f23103a5023810101cf00810101cf0001cf169638705008ca00e216cc14cc02c8810101cf0001cf1612810101cf0002c8810101cf0014810101cf0014810101cf0004c8810101cf00c95004ccc958ccc901ccc901ccc9ed54db31029e82f06f87125f33489aa0941b84dbd5a673a29e0e5abf8c426ad90fc84ba7dc2ed97abae30282f05919afa6998886280924b765935e06a7933e95deadbd426d2a9ed343fc39b233bae3025f0cf2c082202100fa30109b5518c87f01ca0055b050bccb1f5009cf16c8286eb38e1d7f01ca0008206ef2d0806f23103a5023810101cf00810101cf0001cf169638705008ca00e216cc14cc02c8810101cf0001cf1612810101cf0002c8810101cf0014810101cf0014810101cf0004c8810101cf00c95004ccc958ccc901ccc901ccc9ed5403fef8416f2430328200ca2a5327bef2f48177cb25c0ff917f9325c200e2f2f4f8238200ac6f53e1bbf2f481725a5114bbf2f4820898968020f8276f10a1b60bb6088208989680a0aa0012a17270882d553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb0082089896802223240000001a58cf8680cf8480f400f400cf81025020f8276f10a1b60bb6088208989680a010bd10ac109b108a1079106810571046103510241023db3c253402b68200f5162ec2fff2f42d0c10bd0a109d08107d06105d04103d40dedb3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d07070208b081023021114025611544f3026320126f8280188c87001ca005a59cf16810101cf00c9270228ff008e88f4a413f4bcf2c80bed5320e303ed43d9282a01b1a663f3fb5134348000638a7e9020404075c0348034800835c2c070c024fe9000651cb5c85b78807480006475249b407895541b05a3877e9020404075c01640b4405c1b5b6080304f7e10949831c17cbd1c154838b6cf1b19a029001a21206ef2d0805464605468412702f830eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e29fa40810101d700d200d20020d70b01c30093fa40019472d7216de201d2000191d4926d01e255506c168e1dfa40810101d7005902d101706d6d8200c13df8425260c705f2f4705520e207925f07e025d749c21f9131e30d042b3103f805d31f2182105fcc3d14ba8f6d31d33ffa4020d70b01c30093fa40019472d7216de201d2000191d4926d01e2fa0051551514433036f8416f24303229c000e30f10354014c87f01ca0055505065cf1613810101cf00ca00ca0058206e95307001cb0192cf16e2216eb3957f01ca00cc947032ca00e2c9ed54db31e0012c2d2f00d0323637393926816b6b06c70515f2f47f08206ef2d08070038209312d00a113b6097102c8018210d53276db58cb1fcb3fc9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001fe338200c0800c206ef2d08023c7051cf2f45330c2008e58717f544759c85520821005138d915004cb1f12cb3f01cf1601cf16c9221046486610246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0093363330e2206eb3935f0335e30d15142e00a8206ef2d0805088a1717f03c8018210d53276db58cb1fcb3fc91049413010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001ee82102fcb26a2ba8eebd33f0131f8416f2410235f037080407f543478c8552082108b7717355004cb1f12cb3f810101cf0001cf16c91034413010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010355512e0310430006cc87f01ca0055505065cf1613810101cf00ca00ca0058206e95307001cb0192cf16e2216eb3957f01ca00cc947032ca00e2c9ed54db3100ecf90182f0765d7ba1fdf8cd58768e08cd8c2bfb245f4ba9a75e545adceeb8cd5b0db50bf0ba8e49f8416f2410235f0323815aeb02c705f2f440347f59c87f01ca0055505065cf1613810101cf00ca00ca0058206e95307001cb0192cf16e2216eb3957f01ca00cc947032ca00e2c9ed54e05f05f2c08201fec8555082105fcc3d145007cb1f15cb3f5003cf1601206e95307001cb0192cf16e2216eb3957f01ca00cc947032ca00e201fa0201cf16c9150411100403111103020111110170061035440302c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0009a402330022a5102b108a10791068105710461035433400f0c87f01ca0055b050bccb1f5009cf16c8286eb38e1d7f01ca0008206ef2d0806f23103a5023810101cf00810101cf0001cf169638705008ca00e216cc14cc02c8810101cf0001cf1612810101cf0002c8810101cf0014810101cf0014810101cf0004c8810101cf00c95004ccc958ccc901ccc901ccc9ed54e5c898d2');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initEvent_init_args({ $$type: 'Event_init_args', owner_address, collection_content, ticketContent, ticketCost, guardAddress, tickets_amount, start_sale_time, end_sale_time, start_event_time, end_event_time })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const Event_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    23275: { message: `Only guard can punch` },
    27499: { message: `initialized tx need from collection` },
    28284: { message: `Only host are allowed to change guard` },
    29274: { message: `Sales is over` },
    29280: { message: `Only Guard is allowed` },
    30667: { message: `Sold out` },
    44143: { message: `Sales do not started yet` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    51754: { message: `Insufficient funds` },
    62742: { message: `non-sequential NFTs` },
} as const

export const Event_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Only guard can punch": 23275,
    "initialized tx need from collection": 27499,
    "Only host are allowed to change guard": 28284,
    "Sales is over": 29274,
    "Only Guard is allowed": 29280,
    "Sold out": 30667,
    "Sales do not started yet": 44143,
    "not owner": 49280,
    "not from collection": 49469,
    "Insufficient funds": 51754,
    "non-sequential NFTs": 62742,
} as const

const Event_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateEvent","header":3286026747,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticketContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticketCost","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"guardAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tickets_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"start_sale_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"end_sale_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"start_event_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"end_event_time","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"punched","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"EntranceGuard","header":505706633,"fields":[{"name":"guardAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TicketDataForPunch","header":1423377832,"fields":[{"name":"visitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventFactory$Data","header":null,"fields":[{"name":"factory_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Event$Data","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":true}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticketContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticketCost","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"guardAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tickets_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"start_sale_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"end_sale_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"start_event_time","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"end_event_time","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Ticket$Data","header":null,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"punched","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}}]},
]

const Event_opcodes = {
    "LogEventMintRecord": 2743565669,
    "CreateEvent": 3286026747,
    "GetRoyaltyParams": 1765620048,
    "ReportRoyaltyParams": 2831876269,
    "Transfer": 1607220500,
    "OwnershipAssigned": 85167505,
    "Excesses": 3576854235,
    "GetStaticData": 801842850,
    "ReportStaticData": 2339837749,
    "EntranceGuard": 505706633,
    "TicketDataForPunch": 1423377832,
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
}

const Event_getters: ABIGetter[] = [
    {"name":"get_collection_data","methodId":102491,"arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_tickets_amount","methodId":106995,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_nft_address_by_index","methodId":92067,"arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getNftItemInit","methodId":81078,"arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","methodId":68445,"arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"get_start_event_time","methodId":122584,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_end_event_time","methodId":106435,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Event_getterMapping: { [key: string]: string } = {
    'get_collection_data': 'getGetCollectionData',
    'get_tickets_amount': 'getGetTicketsAmount',
    'get_nft_address_by_index': 'getGetNftAddressByIndex',
    'getNftItemInit': 'getGetNftItemInit',
    'get_nft_content': 'getGetNftContent',
    'get_start_event_time': 'getGetStartEventTime',
    'get_end_event_time': 'getGetEndEventTime',
}

const Event_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"initEvent"}},
    {"receiver":"internal","message":{"kind":"text","text":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TicketDataForPunch"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EntranceGuard"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const minTonsForStorage = 10000000n;
export const gasConsumption = 10000000n;

export class Event implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = Event_errors_backward;
    public static readonly opcodes = Event_opcodes;
    
    static async init(owner_address: Address, collection_content: Cell, ticketContent: Cell, ticketCost: bigint, guardAddress: Address, tickets_amount: bigint, start_sale_time: bigint, end_sale_time: bigint, start_event_time: bigint, end_event_time: bigint) {
        return await Event_init(owner_address, collection_content, ticketContent, ticketCost, guardAddress, tickets_amount, start_sale_time, end_sale_time, start_event_time, end_event_time);
    }
    
    static async fromInit(owner_address: Address, collection_content: Cell, ticketContent: Cell, ticketCost: bigint, guardAddress: Address, tickets_amount: bigint, start_sale_time: bigint, end_sale_time: bigint, start_event_time: bigint, end_event_time: bigint) {
        const __gen_init = await Event_init(owner_address, collection_content, ticketContent, ticketCost, guardAddress, tickets_amount, start_sale_time, end_sale_time, start_event_time, end_event_time);
        const address = contractAddress(0, __gen_init);
        return new Event(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Event(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Event_types,
        getters: Event_getters,
        receivers: Event_receivers,
        errors: Event_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: "initEvent" | "Mint" | TicketDataForPunch | EntranceGuard | Deploy) {
        
        let body: Cell | null = null;
        if (message === "initEvent") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "Mint") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TicketDataForPunch') {
            body = beginCell().store(storeTicketDataForPunch(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EntranceGuard') {
            body = beginCell().store(storeEntranceGuard(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadGetterTupleCollectionData(source);
        return result;
    }
    
    async getGetTicketsAmount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_tickets_amount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(item_index);
        const source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(item_index);
        const source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        const builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        const source = (await provider.get('get_nft_content', builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getGetStartEventTime(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_start_event_time', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetEndEventTime(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_end_event_time', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}