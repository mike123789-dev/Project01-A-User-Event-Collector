//
//  CategoryHeaderView.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/11/25.
//

import SwiftUI

struct CategoryHeaderView: View {
    let title: String
    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(title)
                .font(.headline)
                .padding(.top, 5)
            Spacer()
            Text("더보기")
                .font(.subheadline)
                .padding(.top, 5)
        }
        .padding(.vertical, 10)
    }
}

struct CategoryInfoView_Previews: PreviewProvider {
    static var previews: some View {
        CategoryHeaderView(title: "hi")
    }
}
