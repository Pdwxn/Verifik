export default function ProfilePage() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">👤</div>
          <div>
            <p className="font-semibold text-gray-800">Usuario</p>
            <p className="text-sm text-gray-400">usuario@email.com</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200">
        <p className="text-sm font-semibold text-gray-500 mb-1">🔮 Próximamente</p>
        <p className="text-sm text-gray-400">
          Configura tu perfil de salud para recibir recomendaciones personalizadas
          según tus alergias, condiciones y preferencias.
        </p>
      </div>
    </div>
  )
}
