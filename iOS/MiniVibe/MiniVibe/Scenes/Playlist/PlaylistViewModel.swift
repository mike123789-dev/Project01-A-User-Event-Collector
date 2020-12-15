//
//  PlaylistViewModel.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/12/01.
//

import Foundation

class PlaylistViewModel: ObservableObject {
    @Published var playlist: Playlist?
    
    private let networkManager = NetworkManager()
    
    func fetch(id: Int) {
        let url = URLBuilder(pathType: .api,
                             endPoint: .playlists,
                             id: id).create()
        let urlRequest = RequestBuilder(url: url,
                                        method: .get).create()
        networkManager.request(urlRequest: urlRequest) { [weak self] data in
            if let decodedData = try? JSONDecoder().decode(PlayListReponse.self, from: data) {
                DispatchQueue.main.async {
                    self?.playlist = decodedData.playlist
                }
            }
        }
    }
}