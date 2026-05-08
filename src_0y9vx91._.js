module.exports = [
"[project]/src/lib/db/dexie.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KiranaDB",
    ()=>KiranaDB,
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dexie/import-wrapper.mjs [app-ssr] (ecmascript)");
;
class KiranaDB extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    users;
    sessions;
    customers;
    transactions;
    ai_logs;
    constructor(){
        super('KiranaOS_DB_v2');
        this.version(1).stores({
            users: '++id, phone',
            sessions: 'id, userId',
            customers: '++id, userId, name',
            transactions: '++id, userId, customerId, timestamp',
            ai_logs: '++id, userId, timestamp'
        });
    }
}
const db = new KiranaDB();
}),
"[project]/src/lib/store/useStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/dexie.ts [app-ssr] (ecmascript)");
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        currentUser: null,
        isAuthenticated: false,
        isLoading: true,
        customers: [],
        transactions: [],
        aiLogs: [],
        orbState: 'idle',
        setOrbState: (state)=>set({
                orbState: state
            }),
        checkSession: async ()=>{
            const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].sessions.get(1);
            if (session) {
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.get(session.userId);
                if (user) {
                    set({
                        currentUser: user,
                        isAuthenticated: true
                    });
                    await get().fetchData();
                }
            }
            set({
                isLoading: false
            });
        },
        register: async (userData)=>{
            const user = {
                ...userData,
                createdAt: new Date()
            };
            const id = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.add(user);
            user.id = id;
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].sessions.put({
                id: 1,
                userId: user.id,
                lastActive: new Date()
            });
            set({
                currentUser: user,
                isAuthenticated: true
            });
            await get().fetchData();
            return id;
        },
        login: async (phone, password)=>{
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.where('phone').equals(phone).first();
            if (user && user.password === password) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].sessions.put({
                    id: 1,
                    userId: user.id,
                    lastActive: new Date()
                });
                set({
                    currentUser: user,
                    isAuthenticated: true
                });
                await get().fetchData();
                return true;
            }
            return false;
        },
        logout: async ()=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].sessions.clear();
            set({
                currentUser: null,
                isAuthenticated: false,
                customers: [],
                transactions: [],
                aiLogs: []
            });
        },
        fetchData: async ()=>{
            const user = get().currentUser;
            if (!user) return;
            const [customers, transactions, aiLogs] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.where('userId').equals(user.id).toArray(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].transactions.where('userId').equals(user.id).sortBy('timestamp'),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].ai_logs.where('userId').equals(user.id).sortBy('timestamp')
            ]);
            // aiLogs should be chronological (Oldest first for the array, we display bottom-up)
            set({
                customers,
                transactions: transactions.reverse(),
                aiLogs,
                isLoading: false
            });
        },
        searchCustomer: (name)=>{
            if (!name || name.length < 2) return undefined;
            return get().customers.find((c)=>c.name.toLowerCase() === name.toLowerCase() || c.name.toLowerCase().startsWith(name.toLowerCase()));
        },
        addCustomer: async (customer)=>{
            const user = get().currentUser;
            if (!user) throw new Error("No user logged in");
            const id = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.add({
                ...customer,
                userId: user.id
            });
            await get().fetchData();
            return id;
        },
        updateCustomer: async (id, changes)=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.update(id, changes);
            await get().fetchData();
        },
        deleteCustomer: async (id)=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.delete(id);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].transactions.where('customerId').equals(id).delete();
            await get().fetchData();
        },
        addTransaction: async (transaction)=>{
            const user = get().currentUser;
            if (!user) throw new Error("No user logged in");
            const id = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].transactions.add({
                ...transaction,
                userId: user.id
            });
            const customer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.get(transaction.customerId);
            if (customer) {
                const newTotal = transaction.type === 'credit' ? customer.totalDue + transaction.amount : customer.totalDue - transaction.amount;
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.update(transaction.customerId, {
                    totalDue: newTotal,
                    lastTransactionDate: new Date()
                });
            }
            await get().fetchData();
            return id;
        },
        addAiLog: async (log)=>{
            const user = get().currentUser;
            if (!user) throw new Error("No user logged in");
            const id = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].ai_logs.add({
                ...log,
                userId: user.id
            });
            await get().fetchData();
            return id;
        },
        clearAll: async ()=>{
            const user = get().currentUser;
            if (!user) throw new Error("No user logged in");
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].customers.where('userId').equals(user.id).delete();
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].transactions.where('userId').equals(user.id).delete();
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$dexie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].ai_logs.where('userId').equals(user.id).delete();
            await get().fetchData();
        }
    }));
}),
"[project]/src/app/register/Register.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "aiMsg": "Register-module__PwnMtW__aiMsg",
  "avatar": "Register-module__PwnMtW__avatar",
  "bgOrb": "Register-module__PwnMtW__bgOrb",
  "bubble": "Register-module__PwnMtW__bubble",
  "chatArea": "Register-module__PwnMtW__chatArea",
  "container": "Register-module__PwnMtW__container",
  "dot": "Register-module__PwnMtW__dot",
  "header": "Register-module__PwnMtW__header",
  "inputArea": "Register-module__PwnMtW__inputArea",
  "inputWrapper": "Register-module__PwnMtW__inputWrapper",
  "logo": "Register-module__PwnMtW__logo",
  "onboardingBox": "Register-module__PwnMtW__onboardingBox",
  "optBtn": "Register-module__PwnMtW__optBtn",
  "options": "Register-module__PwnMtW__options",
  "sendBtn": "Register-module__PwnMtW__sendBtn",
  "stepIcon": "Register-module__PwnMtW__stepIcon",
  "userMsg": "Register-module__PwnMtW__userMsg",
});
}),
"[project]/src/app/register/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$useStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/useStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/register/Register.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.mjs [app-ssr] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/languages.mjs [app-ssr] (ecmascript) <export default as Languages>");
"use client";
;
;
;
;
;
;
;
const STEPS = [
    {
        key: 'shopName',
        question: "Hello! Welcome to Kirana OS. Let's set up your shop. What is your Shop Name?",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {}, void 0, false, {
            fileName: "[project]/src/app/register/page.tsx",
            lineNumber: 11,
            columnNumber: 118
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        key: 'ownerName',
        question: "Great name! And what is your name (Owner Name)?",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {}, void 0, false, {
            fileName: "[project]/src/app/register/page.tsx",
            lineNumber: 12,
            columnNumber: 90
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        key: 'phone',
        question: "Nice to meet you. Please enter your Phone Number.",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {}, void 0, false, {
            fileName: "[project]/src/app/register/page.tsx",
            lineNumber: 13,
            columnNumber: 88
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        key: 'password',
        question: "Security is important. Set a 4-digit PIN or Password.",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {}, void 0, false, {
            fileName: "[project]/src/app/register/page.tsx",
            lineNumber: 14,
            columnNumber: 95
        }, ("TURBOPACK compile-time value", void 0)),
        type: 'password'
    },
    {
        key: 'language',
        question: "Last step: Which language do you prefer?",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"], {}, void 0, false, {
            fileName: "[project]/src/app/register/page.tsx",
            lineNumber: 15,
            columnNumber: 82
        }, ("TURBOPACK compile-time value", void 0)),
        options: [
            'English',
            'Hindi',
            'Gujarati',
            'Marathi'
        ]
    }
];
function RegisterPage() {
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { register, checkSession, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$useStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkSession();
    }, [
        checkSession
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAuthenticated) router.push('/');
    }, [
        isAuthenticated,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initial Greeting
        setMessages([
            {
                type: 'ai',
                text: STEPS[0].question
            }
        ]);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [
        messages
    ]);
    const handleNext = async (val)=>{
        const value = val || input.trim();
        if (!value && !STEPS[currentStep].options) return;
        const key = STEPS[currentStep].key;
        const newFormData = {
            ...formData,
            [key]: value
        };
        setFormData(newFormData);
        setMessages((prev)=>[
                ...prev,
                {
                    type: 'user',
                    text: value
                }
            ]);
        setInput("");
        if (currentStep < STEPS.length - 1) {
            setTimeout(()=>{
                setMessages((prev)=>[
                        ...prev,
                        {
                            type: 'ai',
                            text: STEPS[currentStep + 1].question
                        }
                    ]);
                setCurrentStep((prev)=>prev + 1);
            }, 600);
        } else {
            // Complete Registration
            setTimeout(async ()=>{
                setMessages((prev)=>[
                        ...prev,
                        {
                            type: 'ai',
                            text: "Perfect! Saving your shop details... Please wait."
                        }
                    ]);
                await register(newFormData);
                setTimeout(()=>router.push('/'), 1500);
            }, 600);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].onboardingBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dot
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "KIRANA OS ONBOARDING"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/register/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chatArea,
                        ref: scrollRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    className: msg.type === 'ai' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].aiMsg : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userMsg,
                                    children: [
                                        msg.type === 'ai' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatar,
                                            children: "AI"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 39
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bubble,
                                            children: msg.text
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/register/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputArea,
                        children: STEPS[currentStep].options ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].options,
                            children: STEPS[currentStep].options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleNext(opt),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].optBtn,
                                    children: opt
                                }, opt, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputWrapper,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepIcon,
                                    children: STEPS[currentStep].icon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: STEPS[currentStep].type || 'text',
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleNext(),
                                    placeholder: "Type your answer...",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sendBtn,
                                    onClick: ()=>handleNext(),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/register/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/register/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/register/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$Register$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bgOrb
            }, void 0, false, {
                fileName: "[project]/src/app/register/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/register/page.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0y9vx91._.js.map